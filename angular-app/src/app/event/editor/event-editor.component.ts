import {Component, OnInit} from "@angular/core";
import {EventAnalyzerResponse, EventCodeAnalyzer} from "./event-code-analyzer";
import {AppRoutesEnum} from "../../app-routes.enum";
import {Router} from "@angular/router";
import {
    AggregationEvent,
    AggregationEventUpdateItem,
    AtomicEvent,
    AtomicEventUpdateItem,
    ComplexEvent,
    ComplexEventUpdateItem,
    ContextParam,
    EventCategory,
    EventListItem,
    EventPageItem
} from '../event';
import {forkJoin} from "rxjs";
import {NgControl, NgForm} from "@angular/forms";
import {EventService} from "../event.service";
import {ContextParamService} from "../context-param.service";
import {ComponentItem, ComponentService} from "../component.service";

@Component({
    selector: 'app-event-editor',
    templateUrl: 'event-editor.component.html',
    styleUrls: ['event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {
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

    query: string = ``;

    codeAnalyzerResponse: EventAnalyzerResponse | null | undefined;
    successMessage: string = '';
    isEditMode: boolean = false;
    event!: EventPageItem;
    EventCategory = EventCategory;
    eventCategories = [EventCategory.ATOMIC, EventCategory.AGGREGATION, EventCategory.COMPLEX];

    contextParams: ContextParam[] = [];
    events: EventListItem[] = [];
    initialEvents: EventListItem[] = [];
    initialContext: string = '';
    components: ComponentItem[] = [];
    selectedComponent: string = '';


    constructor(private codeAnalyzer: EventCodeAnalyzer, private componentService: ComponentService,
                private router: Router, private contextParamService: ContextParamService,
                private eventService: EventService) {
    }

    ngOnInit(): void {
        const currentRouteParts = this.router.url.split('/');

        this.isEditMode = currentRouteParts[2] === AppRoutesEnum.EDIT;

        if (this.isEditMode) {
            this.loadEditorData(currentRouteParts[3]);
        } else {
            this.query = '';
            this.event = {} as EventPageItem;
            this.loadAdditionalData(this.event);
        }
    }

    loadEditorData(eventCode: string) {
        this.eventService.getEventByCode(eventCode).subscribe(
            evnt => {
                this.event = evnt;
                this.initialContext = evnt.contextParam.code;
                if (evnt.inboundEvent) {
                    this.initialEvents = evnt.inboundEvent;
                }
                this.loadAdditionalData(evnt);
            }
        )
    }

    loadAdditionalData(evnt: EventPageItem) {
        forkJoin([
            this.eventService.getEvents(),
            this.contextParamService.getParams(),
            this.componentService.getComponents()
        ]).subscribe(
            ([events, params, components]) => {
                this.contextParams = params;
                this.events = events.map(ev => {
                    return {
                        code: ev.code,
                        description: ev.description,
                        categoryEvent: ev.categoryEvent
                    }
                });
                this.components = components;
                components.forEach(comp => {
                    if (comp.event.find(ev => ev.code === this.event.code)) {
                        this.selectedComponent = comp.code;
                    }
                });
                this.initEditorQuery(evnt);
            }
        );
    }

    setEditorContent() {
        this.codeAnalyzerResponse = null;
    }

    checkCodeSyntax() {
        this.codeAnalyzerResponse = this.codeAnalyzer.analyseEvent(this.event.categoryEvent, this.query, this.isEditMode);
        if (this.codeAnalyzerResponse.record) {
            this.successMessage = 'Ошибки не найдены';
        }
    }

    onSave() {
        this.codeAnalyzerResponse = this.codeAnalyzer.analyseEvent(this.event.categoryEvent, this.query, this.isEditMode);

        if (!this.codeAnalyzerResponse.errorMessage) {
            switch (this.event.categoryEvent) {
                case EventCategory.ATOMIC:
                    this.saveAtomicEvent(this.codeAnalyzerResponse.record as AtomicEvent);
                    break;
                case EventCategory.AGGREGATION:
                    this.saveAggregationEvent(this.codeAnalyzerResponse.record as AggregationEvent);
                    break;
                case EventCategory.COMPLEX:
                    this.saveComplexEvent(this.codeAnalyzerResponse.record as ComplexEvent);
                    break;
            }
        }

    }

    manageParamAtCodeEditor() {
        this.query = this.codeAnalyzer.manageParamValueForEditor(this.event.contextParam, this.query);
    }

    manageEventsAtCodeEditor() {
        this.query = this.codeAnalyzer.manageEventsValueForEditor(this.event.inboundEvent, this.query);
    }

    manageComponentAtCodeEditor() {
        this.query = this.codeAnalyzer.manageComponentValueForEditor(this.selectedComponent, this.query);
    }

    isControlValid(control: NgControl, form: NgForm): boolean {
        if (form) {
            return <boolean>control.valid;
        }
        return true;
    }

    initEditorQuery(ev: EventPageItem) {
        switch (ev.categoryEvent) {
            case EventCategory.ATOMIC:
                this.query = `EVENT ${ev.code}
DESCRIPTION = "${ev.description}"
COMPONENT = "${this.selectedComponent}"
CONTEXT = "${ev.contextParam?.code}"`;
                break;
            case EventCategory.AGGREGATION:
                this.query = `EVENT ${ev.code}
DESCRIPTION = "${ev.description}"
CONTEXT = "${ev.contextParam?.code}"
AGGREGATION_QUERY = "${ev.aggregationQuery}"
TIMESTAMP_BEGIN = ${ev.timestampBegin}
TIMESTAMP_END = ${ev.timestampEnd}`;
                break;
            case EventCategory.COMPLEX:
                this.query = `EVENT ${ev.code}
DESCRIPTION = "${ev.description}"
CONTEXT = "${ev.contextParam?.code}"
TEMPLATE_EVENT = "${ev.templateEvent}"
EVENTS = "${ev.inboundEvent?.map(ev => ev.code).join(',')}"`;
                break;
        }

    }

    private saveAtomicEvent(event: AtomicEvent) {
        if (this.isEditMode) {
            let updateItem!: AtomicEventUpdateItem;
            if (this.initialContext !== event.contextParamCode) {
                updateItem = {
                    // @ts-ignore
                    code: event.code,
                    description: event.description,
                    contextParamCode: event.contextParamCode
                }
            } else {
                updateItem = {
                    // @ts-ignore
                    code: event.code,
                    description: event.description
                }
            }
            this.eventService.updateAtomicEvent(updateItem).subscribe((event) => {
                this.successMessage = 'Событие успешно сохранено';
                this.loadEditorData(event.code);
            });
        } else {
            this.eventService.createAtomicEvent({
                description: event.description,
                contextParamCode: event.contextParamCode,
                codeComponent: event.codeComponent
            }).subscribe((event) => {
                this.successMessage = 'Событие успешно сохранено';
                this.router.navigate([`/${AppRoutesEnum.EVENT_SCRIPT}/${AppRoutesEnum.EDIT}/${event.code}`]);
            });
        }
    }

    private saveComplexEvent(event: ComplexEvent) {
        if (this.isEditMode) {
            let updateItem!: ComplexEventUpdateItem;
            if (this.initialContext !== event.contextParamCode) {
                updateItem = {
                    // @ts-ignore
                    code: event.code,
                    description: event.description,
                    contextParamCode: event.contextParamCode,
                    templateEvent: event.templateEvent
                }
            } else {
                updateItem = {
                    // @ts-ignore
                    code: event.code,
                    description: event.description,
                    templateEvent: event.templateEvent
                }
            }
            this.eventService.updateComplexEvent(updateItem).subscribe(
                (ev) => {
                    this.afterSaveComplexEvent(ev.code);
                }
            )
        } else {
            this.eventService.createComplexEvent({
                description: event.description,
                contextParamCode: event.contextParamCode,
                templateEvent: event.templateEvent
            }).subscribe(
                (ev) => {
                    this.afterSaveComplexEvent(ev.code);
                }
            );
        }
    }

    private afterSaveComplexEvent(codeComplex: string) {
        this.event.inboundEvent?.forEach(ev => {
            if (!this.initialEvents?.includes(ev)) {
                this.eventService.bindEventToComplex({
                    codeComplex: codeComplex,
                    codeAnother: ev.code
                }).subscribe();
            }
        });
        this.initialEvents?.forEach(ev => {
            if (!this.event.inboundEvent?.includes(ev)) {
                this.eventService.unbindEventToComplex({
                    codeComplex: codeComplex,
                    codeAnother: ev.code
                }).subscribe();
            }
        });
        this.successMessage = 'Событие успешно сохранено';
        setTimeout(() => {
            this.loadEditorData(codeComplex);
            this.router.navigate([`/${AppRoutesEnum.EVENT_SCRIPT}/${AppRoutesEnum.EDIT}/${codeComplex}`]);
        }, 1500);
    }

    private saveAggregationEvent(event: AggregationEvent) {
        if (this.isEditMode) {
            let updateItem!: AggregationEventUpdateItem;
            if (this.initialContext !== event.contextParamCode) {
                updateItem = {
                    // @ts-ignore
                    code: event.code,
                    description: event.description,
                    contextParamCode: event.contextParamCode,
                    timestampEnd: event.timestampEnd,
                    timestampBegin: event.timestampBegin,
                    aggregationQuery: event.aggregationQuery
                }
            } else {
                updateItem = {
                    // @ts-ignore
                    code: event.code,
                    description: event.description,
                    timestampEnd: event.timestampEnd,
                    timestampBegin: event.timestampBegin,
                    aggregationQuery: event.aggregationQuery
                }
            }
            this.eventService.updateAggregationEvent(updateItem).subscribe((event) => {
                this.successMessage = 'Событие успешно сохранено';
                this.loadEditorData(event.code);
            });
        } else {
            this.eventService.createAggregationEvent({
                description: event.description,
                contextParamCode: event.contextParamCode,
                timestampEnd: event.timestampEnd,
                timestampBegin: event.timestampBegin,
                aggregationQuery: event.aggregationQuery
            }).subscribe((event) => {
                this.successMessage = 'Событие успешно сохранено';
                this.router.navigate([`/${AppRoutesEnum.EVENT_SCRIPT}/${AppRoutesEnum.EDIT}/${event.code}`]);
            });
        }
    }
}
