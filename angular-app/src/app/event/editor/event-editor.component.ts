import {Component, OnInit} from "@angular/core";
import {AnalyzerResponse, EventCodeAnalyzer} from "./event-code-analyzer";
import {AppRoutesEnum} from "../../app-routes.enum";
import {Router} from "@angular/router";
import {Event} from '../event';
import {Observable} from "rxjs";
import {NgControl, NgForm} from "@angular/forms";
import {ActiveRule, ActiveRuleEventTypeBind} from "../../active-rule/active-rule";
import {EventService} from "../event.service";
import {ActiveRuleService} from "../../active-rule/active-rule.service";

@Component({
    selector: 'app-active-rule-editor',
    templateUrl: 'event-editor.component.html',
    styleUrls: ['event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {
    content: string = 'content';
    codeMirrorOptions: any = {
        mode: "text/x-mysql",
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        lineWrapping: false,
        extraKeys: {"Ctrl-Space": "autocomplete"},
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        autoCloseBrackets: true,
        matchBrackets: true,
        lint: true
    };

    query: string =
        `RULE AR-1
DESCRIPTION = "Description"
EVENT = "event1"
CONDITION = "cond1"
ACTION = "action1"`;

    codeAnalyzerResponse: AnalyzerResponse | null | undefined;
    successMessage: string = '';
    isEditMode: boolean = false;
    eventList: Event[] = [];
    selectedEvents: Event[] | undefined = [];
    initialEventsList: Event[] | undefined = [];
    activeRule: ActiveRule = new ActiveRule();

    constructor(private codeAnalyzer: EventCodeAnalyzer,
                private router: Router,
                private activeRuleService: ActiveRuleService,
                private eventService: EventService) {
    }

    ngOnInit(): void {
        const currentRouteParts = this.router.url.split('/');

        this.isEditMode = currentRouteParts[2] === AppRoutesEnum.EDIT;

        this.loadAdditionalData();
        if (this.isEditMode) {
            this.loadEditorData(currentRouteParts[3]);
        } else {
            this.query = '';
        }
    }

    loadEditorData(ruleCode: string) {
        this.activeRuleService.getRuleByCode(ruleCode).subscribe(
            rule => {
                this.activeRule = rule;
                this.selectedEvents = rule.event;
                this.initialEventsList = rule.event;
                this.initEditorQuery(rule);
            }
        )
    }

    loadAdditionalData() {
        this.eventService.getEvents().subscribe(
            events => {
                this.eventList = events.map(e => {
                    return {
                        code: e.code,
                        description: e.description,
                        categoryEvent: e.categoryEvent
                    }
                });
            }
        )
    }

    setEditorContent() {
        this.codeAnalyzerResponse = null;
    }

    checkCodeSyntax() {
        this.codeAnalyzerResponse = this.codeAnalyzer.analyseRule(this.query, this.isEditMode);
        if (this.codeAnalyzerResponse.record) {
            this.successMessage = 'Ошибки не найдены';
        }
        console.log(this.codeAnalyzerResponse.record)
    }

    onSave() {
        this.codeAnalyzerResponse = this.codeAnalyzer.analyseRule(this.query, this.isEditMode);

        if (!this.codeAnalyzerResponse.errorMessage) {
            this.saveRequest(this.codeAnalyzerResponse.record).subscribe(
                activeRule => {
                    this.selectedEvents?.forEach(ev => {
                        if (!this.initialEventsList?.includes(ev)) {
                            this.activeRuleService.addEventsToRule({
                                codeRule: activeRule.code,
                                codeEvent: ev.code,
                                typeBind: ActiveRuleEventTypeBind.EVENT_TO_RULE
                            }).subscribe();
                        }
                    });
                    this.initialEventsList?.forEach(ev => {
                        if (!this.selectedEvents?.includes(ev)) {
                            this.activeRuleService.deleteEventsToRule({
                                codeRule: activeRule.code,
                                codeEvent: ev.code,
                                typeBind: ActiveRuleEventTypeBind.EVENT_TO_RULE
                            }).subscribe();
                        }
                    });
                    this.successMessage = 'Правило успешно сохранено';
                    if (this.isEditMode) {
                        setTimeout(() => {
                            // @ts-ignore
                            this.loadEditorData(activeRule.code);
                        }, 3000)

                    } else {
                        this.router.navigate([`/${AppRoutesEnum.ACTIVE_RULE_SCRIPT}/${AppRoutesEnum.EDIT}/${activeRule.code}`]);
                    }
                }
            )
        }
    }

    manageEventAtCodeEditor() {
        this.query = this.codeAnalyzer.manageEventValueForEditor(this.selectedEvents, this.query);
    }

    isControlValid(control: NgControl, form: NgForm): boolean {
        if (form) {
            return <boolean>control.valid;
        }
        return true;
    }

    initEditorQuery(activeRule: ActiveRule) {
        this.query = `RULE ${activeRule.code}
DESCRIPTION = "${activeRule.description}"
CONDITION = "${activeRule.condition}"
ACTION = "${activeRule.action}"
EVENT = "${this.selectedEvents?.map(ev => ev.code).toString()}"`;
    }

    private saveRequest(activeRule: ActiveRule | null | undefined): Observable<ActiveRule> {
        if (this.isEditMode) {
            return this.activeRuleService.updateRule({
                code: activeRule?.code,
                condition: activeRule?.condition,
                action: activeRule?.action,
                description: activeRule?.description
            });
        } else {
            return this.activeRuleService.createRule({
                condition: activeRule?.condition,
                action: activeRule?.action,
                description: activeRule?.description
            });
        }
    }
}
