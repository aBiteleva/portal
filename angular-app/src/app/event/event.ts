import {ActiveRule} from "../active-rule/active-rule";
import {CodeItem} from "../common/interface/code-item";

export interface EventListItem {
    code: string;
    categoryEvent: EventCategory;
    description: string;
}

export interface EventPageItem {
    activeRule?: ActiveRule[];
    categoryEvent: EventCategory;
    code: string;
    description: string;
    // TODO: specify types
    contextParam: ContextParam;
    inboundComplexEvent?: object[];
    inboundEvent?: EventListItem[];
    templateEvent?: string;
    aggregationQuery?: string;
    // TODO: specify types
    atomicEvent?: object[];
    timestampBegin?: number;
    timestampEnd?: number;
    codeComponent?: string;
}

export interface ContextParam {
    code: string;
    name: string;
    description: string;
    dataType: string;
}

export interface AtomicEventCreateItem {
    codeComponent?: string;
    contextParamCode?: string;
    description: string;
}

export interface AtomicEventUpdateItem extends AtomicEventCreateItem, CodeItem {}

export interface AtomicEvent extends AtomicEventCreateItem {
    code?: string;
}

export interface AtomicEventComponent {
    codeEvent: string;
    codeComponent: string;
}

export interface AggregationEventCreateItem {
    codeComponent?: string;
    contextParamCode?: string;
    description: string;
    aggregationQuery?: string;
    timestampBegin?: number;
    timestampEnd?: number;
}

export interface AggregationEventUpdateItem extends AggregationEventCreateItem, CodeItem {}

export interface AggregationEvent extends AggregationEventCreateItem {
    code?: string;
}

export interface AggregationAtomicEvent {
    codeAtomic: string;
    codeAggregation: string;
    codeComponentAtomic: string;
}

export interface ComplexEventCreateItem {
    templateEvent?: string;
    contextParamCode?: string;
    description: string;
}

export interface ComplexEventUpdateItem extends ComplexEventCreateItem, CodeItem {}

export interface ComplexEvent extends ComplexEventCreateItem {
    code?: string;
}

export interface InboundComplexEvent {
    codeComplex: string;
    codeAnother: string;
}

export enum EventCategory {
    ATOMIC = 'atomic',
    AGGREGATION = 'aggregation',
    COMPLEX = 'complex'
}
