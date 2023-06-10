import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {AnalyzerResponse, ActiveRuleCodeAnalyzer} from "../active-rule-code-analyzer";
import {EventListItem} from "../../../event/event";
import {ActiveRule, ActiveRuleEventTypeBind} from "../../active-rule";
import {Router} from "@angular/router";
import {ActiveRuleService} from "../../active-rule.service";
import {AppRoutesEnum} from "../../../app-routes.enum";
import {Observable} from "rxjs";

@Component({
    templateUrl: 'free-write.component.html',
    selector: 'app-free-write-editor',
    styleUrls: ['../active-rule-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FreeWriteComponent implements OnInit {
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
    @Input() eventList: EventListItem[] = [];
    selectedEvents: EventListItem[] | undefined = [];
    @Input() initialEventsList: EventListItem[] | undefined = [];
    @Input() activeRule!: ActiveRule;

    constructor(private codeAnalyzer: ActiveRuleCodeAnalyzer,
                private router: Router,
                private activeRuleService: ActiveRuleService) {
    }

    ngOnInit(): void {
        const currentRouteParts = this.router.url.split('/');

        this.isEditMode = currentRouteParts[2] === AppRoutesEnum.EDIT;
        if (this.isEditMode) {
            this.loadEditorData();
        } else {
            this.query = '';
        }
    }

    loadEditorData() {
        this.selectedEvents = this.activeRule?.event;
        this.initialEventsList = this.activeRule?.event;
        this.query = `RULE ${this.activeRule?.code}
DESCRIPTION = "${this.activeRule?.description}"
EVENT = "${this.activeRule?.event?.map(ev => ev.code).toString()}"
CONDITION = "${this.activeRule?.condition}"
ACTION = "${this.activeRule?.action}"`;
    }

    setEditorContent() {
        this.codeAnalyzerResponse = null;
    }

    checkCodeSyntax() {
        this.codeAnalyzerResponse = this.codeAnalyzer.analyseRule(this.query, this.isEditMode);
        if (this.codeAnalyzerResponse.record) {
            this.successMessage = 'Ошибки не найдены';
        }
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
