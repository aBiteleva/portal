import {Component, OnInit} from "@angular/core";
import {AnalyzerResponse, CodeAnalyzer} from "./code-analyzer";
import {AppRoutesEnum} from "../../app-routes.enum";
import {Router} from "@angular/router";
import {ActiveRuleService} from "../active-rule.service";
import {EventService} from "../../event/event.service";
import {Event} from '../../event/event';
import {Observable} from "rxjs";
import {ActiveRule, ActiveRuleEventTypeBind} from "../active-rule";

@Component({
    selector: 'app-active-rule-editor',
    templateUrl: 'active-rule-editor.component.html',
    styleUrls: ['active-rule-editor.component.scss']
})
export class ActiveRuleEditorComponent implements OnInit {
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
    isEditMode: boolean = false;
    eventList: Event[] = [];
    selectedEvents: Event[] | undefined = [];
    initialEventsList: Event[] | undefined = [];

    constructor(private codeAnalyzer: CodeAnalyzer,
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
                this.selectedEvents = rule.event;
                this.initialEventsList = rule.event;
                console.log(this.selectedEvents)
                this.query = `RULE ${rule.code}
DESCRIPTION = "${rule.description}"
EVENT = "${rule.event?.map(ev => ev.code).toString()}"
CONDITION = "${rule.condition}"
ACTION = "${rule.action}"`;
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
        console.log(this.codeAnalyzerResponse.record)
    }

    onSave() {
        this.codeAnalyzerResponse = this.codeAnalyzer.analyseRule(this.query, this.isEditMode);

        if (!this.codeAnalyzerResponse.errorMessage) {
            this.saveRequest().subscribe(
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

    private saveRequest(): Observable<ActiveRule> {
        if (this.isEditMode) {
            return this.activeRuleService.updateRule({
                code: this.codeAnalyzerResponse?.record?.code,
                condition: this.codeAnalyzerResponse?.record?.condition,
                action: this.codeAnalyzerResponse?.record?.action,
                description: this.codeAnalyzerResponse?.record?.description
            });
        } else {
            return this.activeRuleService.createRule({
                condition: this.codeAnalyzerResponse?.record?.condition,
                action: this.codeAnalyzerResponse?.record?.action,
                description: this.codeAnalyzerResponse?.record?.description
            });
        }
    }
}
