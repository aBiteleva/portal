import {Injectable} from "@angular/core";
import {AggregationEvent, AtomicEvent, ComplexEvent, ContextParam, EventCategory, EventListItem} from '../event';

@Injectable({providedIn: 'root'})
export class EventCodeAnalyzer {

    analyseEvent(eventCategory: EventCategory, query: string, isEditMode: boolean): EventAnalyzerResponse {
        switch (eventCategory) {
            case EventCategory.ATOMIC:
                return this.analyseAtomicEvent(query, isEditMode);
            case EventCategory.AGGREGATION:
                return this.analyseAggregationEvent(query, isEditMode);
            case EventCategory.COMPLEX:
                return this.analyseComplexEvent(query, isEditMode);
        }
    }

    manageParamValueForEditor(contextParam: ContextParam | undefined, query: string): string {
        const queryRows = query.split('\n');
        if (query.includes(EventKeywords.CONTEXT)) {
            for (let i = 0; i < queryRows.length; i++) {
                const rowLexems = queryRows[i].trim().split(' ').filter(lex => lex !== '');
                if (rowLexems.includes(EventKeywords.CONTEXT)) {
                    queryRows.splice(i, 1);
                }
            }
        }
        if (contextParam) {
            queryRows.push(`CONTEXT = "${contextParam.code}"`)
        }
        return queryRows.join('\n');
    }

    manageComponentValueForEditor(component: string | undefined, query: string): string {
        const queryRows = query.split('\n');
        if (query.includes(EventKeywords.COMPONENT)) {
            for (let i = 0; i < queryRows.length; i++) {
                const rowLexems = queryRows[i].trim().split(' ').filter(lex => lex !== '');
                if (rowLexems.includes(EventKeywords.COMPONENT)) {
                    queryRows.splice(i, 1);
                }
            }
        }
        if (component) {
            queryRows.push(`COMPONENT = "${component}"`)
        }
        return queryRows.join('\n');
    }

    manageEventsValueForEditor(selectedEvents: EventListItem[] | undefined, query: string): string {
        const queryRows = query.split('\n');
        if (query.includes(EventKeywords.EVENTS)) {
            for (let i = 0; i < queryRows.length; i++) {
                const rowLexems = queryRows[i].trim().split(' ').filter(lex => lex !== '');
                if (rowLexems.includes(EventKeywords.EVENTS)) {
                    queryRows.splice(i, 1);
                }
            }
        }
        if (selectedEvents?.length) {
            queryRows.push(`EVENTS = "${selectedEvents.map(ev => ev.code).join(', ')}"`)
        }
        return queryRows.join('\n');
    }

    private analyseAtomicEvent(query: string, isEditMode: boolean): EventAnalyzerResponse {
        let requiredFields = [EventKeywords.DESCRIPTION, EventKeywords.CONTEXT, EventKeywords.COMPONENT];
        let event = {} as AtomicEvent;
        const queryRows = query.split('\n');
        const eventInitLexems = queryRows[0].trim().split(' ').filter(lex => lex !== '');
        if (eventInitLexems[0] !== EventKeywords.EVENT) {
            return {
                errorMessage: `Ошибка: объявление события должно начинаться с ключевого слова "${EventKeywords.EVENT}"`,
                record: null
            }
        }
        if (isEditMode) {
            event.code = eventInitLexems[1];
        }
        for (let i = 0; i < queryRows.length; i++) {
            const rowLexems = queryRows[i].trim().split(' ').filter(lex => lex !== '');
            for (let field of requiredFields) {
                if (rowLexems.includes(field)) {
                    if (rowLexems[0] !== field) {
                        return {
                            errorMessage: `Ошибка в строке ${i + 1}: строка должна начинаться с ключевого слова "${field}"`,
                            record: null
                        }
                    }
                    if (rowLexems[1] !== '=') {
                        return {
                            errorMessage: `Ошибка в строке ${i + 1}: пропущен или неверно указан знак присваивания "=" после ключевого слова "${field}"`,
                            record: null
                        }
                    }
                    if (rowLexems.length > 3) {
                        const valueLexem = rowLexems.slice(2).join(' ');
                        rowLexems.splice(2, rowLexems.length - 2, valueLexem);
                        if (!valueLexem.endsWith('"') || !valueLexem.startsWith('"')
                            || valueLexem.split('"').length !== 3) {
                            return {
                                errorMessage: `Ошибка в строке ${i + 1}: неверно указано значение поля "${field}"`,
                                record: null
                            }
                        }

                    }
                    event = this.setAtomicEventFieldValue(event, field, rowLexems[2]);
                    requiredFields = requiredFields.filter(requiredField => requiredField !== field);
                }
            }
        }

        if (requiredFields.length) {
            return {
                errorMessage: `Не определены следующие обязательные параметры события: ${requiredFields.join(', ')}`,
                record: null
            }
        } else {
            return {
                errorMessage: '',
                record: event
            }
        }
    }

    private analyseAggregationEvent(query: string, isEditMode: boolean): EventAnalyzerResponse {
        let requiredFields = [
            EventKeywords.DESCRIPTION,
            EventKeywords.CONTEXT,
            EventKeywords.AGGREGATION_QUERY,
            EventKeywords.TIMESTAMP_END,
            EventKeywords.TIMESTAMP_BEGIN
        ];
        let event = {} as AggregationEvent;
        const queryRows = query.split('\n');
        const eventInitLexems = queryRows[0].trim().split(' ').filter(lex => lex !== '');
        if (eventInitLexems[0] !== EventKeywords.EVENT) {
            return {
                errorMessage: `Ошибка: объявление события должно начинаться с ключевого слова "${EventKeywords.EVENT}"`,
                record: null
            }
        }
        if (isEditMode) {
            event.code = eventInitLexems[1];
        }
        for (let i = 0; i < queryRows.length; i++) {
            const rowLexems = queryRows[i].trim().split(' ').filter(lex => lex !== '');
            for (let field of requiredFields) {
                if (rowLexems.includes(field)) {
                    if (rowLexems[0] !== field) {
                        return {
                            errorMessage: `Ошибка в строке ${i + 1}: строка должна начинаться с ключевого слова "${field}"`,
                            record: null
                        }
                    }
                    if (rowLexems[1] !== '=') {
                        return {
                            errorMessage: `Ошибка в строке ${i + 1}: пропущен или неверно указан знак присваивания "=" после ключевого слова "${field}"`,
                            record: null
                        }
                    }
                    if (rowLexems.length > 3) {
                        const valueLexem = rowLexems.slice(2).join(' ');
                        rowLexems.splice(2, rowLexems.length - 2, valueLexem);
                        if (!valueLexem.endsWith('"') || !valueLexem.startsWith('"')
                            || valueLexem.split('"').length !== 3) {
                            return {
                                errorMessage: `Ошибка в строке ${i + 1}: неверно указано значение поля "${field}"`,
                                record: null
                            }
                        }

                    }
                    event = this.setAggregationEventFieldValue(event, field, rowLexems[2]);
                    requiredFields = requiredFields.filter(requiredField => requiredField !== field);
                }
            }
        }

        if (requiredFields.length) {
            return {
                errorMessage: `Не определены следующие обязательные параметры события: ${requiredFields.join(', ')}`,
                record: null
            }
        } else {
            return {
                errorMessage: '',
                record: event
            }
        }
    }

    private analyseComplexEvent(query: string, isEditMode: boolean): EventAnalyzerResponse {
        let requiredFields = [EventKeywords.DESCRIPTION, EventKeywords.CONTEXT, EventKeywords.TEMPLATE_EVENT];
        let event = {} as ComplexEvent;
        const queryRows = query.split('\n');
        const eventInitLexems = queryRows[0].trim().split(' ').filter(lex => lex !== '');
        if (eventInitLexems[0] !== EventKeywords.EVENT) {
            return {
                errorMessage: `Ошибка: объявление события должно начинаться с ключевого слова "${EventKeywords.EVENT}"`,
                record: null
            }
        }
        if (isEditMode) {
            event.code = eventInitLexems[1];
        }
        for (let i = 0; i < queryRows.length; i++) {
            const rowLexems = queryRows[i].trim().split(' ').filter(lex => lex !== '');
            for (let field of requiredFields) {
                if (rowLexems.includes(field)) {
                    if (rowLexems[0] !== field) {
                        return {
                            errorMessage: `Ошибка в строке ${i + 1}: строка должна начинаться с ключевого слова "${field}"`,
                            record: null
                        }
                    }
                    if (rowLexems[1] !== '=') {
                        return {
                            errorMessage: `Ошибка в строке ${i + 1}: пропущен или неверно указан знак присваивания "=" после ключевого слова "${field}"`,
                            record: null
                        }
                    }
                    if (rowLexems.length > 3) {
                        const valueLexem = rowLexems.slice(2).join(' ');
                        rowLexems.splice(2, rowLexems.length - 2, valueLexem);
                        if (!valueLexem.endsWith('"') || !valueLexem.startsWith('"')
                            || valueLexem.split('"').length % 2 !== 1) {
                            return {
                                errorMessage: `Ошибка в строке ${i + 1}: неверно указано значение поля "${field}"`,
                                record: null
                            }
                        }

                    }
                    event = this.setComplexEventFieldValue(event, field, rowLexems[2]);
                    requiredFields = requiredFields.filter(requiredField => requiredField !== field);
                }
            }
        }

        if (requiredFields.length) {
            return {
                errorMessage: `Не определены следующие обязательные параметры события: ${requiredFields.join(', ')}`,
                record: null
            }
        } else {
            return {
                errorMessage: '',
                record: event
            }
        }
    }

    private setAtomicEventFieldValue(atomicEvent: AtomicEvent, field: EventKeywords, value: string) {
        switch (field) {
            case EventKeywords.DESCRIPTION:
                atomicEvent.description = value.replace(/"/g, "");
                return atomicEvent;
            case EventKeywords.COMPONENT:
                atomicEvent.codeComponent = value.replace(/"/g, "");
                return atomicEvent;
            case EventKeywords.CONTEXT:
                atomicEvent.contextParamCode = value.replace(/"/g, "");
                return atomicEvent;
            default:
                return atomicEvent;
        }
    }

    private setAggregationEventFieldValue(aggregationEvent: AggregationEvent, field: EventKeywords, value: string) {
        switch (field) {
            case EventKeywords.DESCRIPTION:
                aggregationEvent.description = value.replace(/"/g, "");
                return aggregationEvent;
            case EventKeywords.COMPONENT:
                aggregationEvent.codeComponent = value.replace(/"/g, "");
                return aggregationEvent;
            case EventKeywords.CONTEXT:
                aggregationEvent.contextParamCode = value.replace(/"/g, "");
                return aggregationEvent;
            case EventKeywords.AGGREGATION_QUERY:
                aggregationEvent.aggregationQuery = value.replace(/"/g, "");
                return aggregationEvent;
            case EventKeywords.TIMESTAMP_BEGIN:
                aggregationEvent.timestampBegin = +value;
                return aggregationEvent;
            case EventKeywords.TIMESTAMP_END:
                aggregationEvent.timestampEnd = +value;
                return aggregationEvent;
            default:
                return aggregationEvent;
        }
    }

    private setComplexEventFieldValue(complexEvent: ComplexEvent, field: EventKeywords, value: string) {
        switch (field) {
            case EventKeywords.DESCRIPTION:
                complexEvent.description = value.replace(/"/g, "");
                return complexEvent;
            case EventKeywords.TEMPLATE_EVENT:
                complexEvent.templateEvent = JSON.stringify(JSON.parse(value.replace(/^.|.$/g, "")));
                return complexEvent;
            case EventKeywords.CONTEXT:
                complexEvent.contextParamCode = value.replace(/"/g, "");
                return complexEvent;
            default:
                return complexEvent;
        }
    }
}

export enum EventKeywords {
    AGGREGATION_QUERY = 'AGGREGATION_QUERY',
    TYPE = 'TYPE',
    CODE = 'CODE',
    DESCRIPTION = 'DESCRIPTION',
    EVENT = 'EVENT',
    EVENTS = 'EVENTS',
    COMPONENT = 'COMPONENT',
    TEMPLATE_EVENT = 'TEMPLATE_EVENT',
    TIMESTAMP_BEGIN = 'TIMESTAMP_BEGIN',
    TIMESTAMP_END = 'TIMESTAMP_END',
    CONTEXT = 'CONTEXT'
}

export enum ChangeEventMode {
    DROPDOWN = 'dropdown',
    EDITOR = 'editor'
}

export interface EventAnalyzerResponse {
    errorMessage: string;
    record: AtomicEvent | AggregationEvent | ComplexEvent | null;
}
