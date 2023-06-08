import {ActiveRule} from "../active-rule/active-rule";

export interface Event {
    activeRule?: ActiveRule[];
    categoryEvent: EventCategory;
    code: string;
    description: string;
    // TODO: specify types
    contextParam?: object;
    inboundComplexEvent?: object[];
}

export enum EventCategory {
    ATOMIC = 'atomic',
    AGGREGATION = 'aggregation',
    COMPLEX = 'complex'
}
