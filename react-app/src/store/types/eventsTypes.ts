interface EventComponentInterface {
    code: string
    description: string
}

export interface EventsInterface {
    code: string,
    description: string,
    categoryEvent: string,
    component: EventComponentInterface[]
}

export interface EventsState {
    events: EventsInterface[],
    isLoading: boolean,
    error: string | null
}

export enum EventsActionTypes {
    FETCH_EVENTS_SYSTEM_CODE = 'FETCH_EVENTS_SYSTEM_CODE',
    FETCH_EVENTS_SYSTEM_CODE_SUCCESS = 'FETCH_EVENTS_SYSTEM_CODE_SUCCESS',
    FETCH_EVENTS_SYSTEM_CODE_ERROR = 'FETCH_EVENTS_SYSTEM_CODE_ERROR',
}

interface FetchEventsBySystemCodeAction {
    type: EventsActionTypes.FETCH_EVENTS_SYSTEM_CODE;
}

interface FetchEventsBySystemCodeSuccessAction {
    type: EventsActionTypes.FETCH_EVENTS_SYSTEM_CODE_SUCCESS;
    payload: EventsInterface[];
}

interface FetchEventsBySystemCodeErrorAction {
    type: EventsActionTypes.FETCH_EVENTS_SYSTEM_CODE_ERROR;
    payload: string;
}

export type EventsAction = FetchEventsBySystemCodeAction
    | FetchEventsBySystemCodeSuccessAction |FetchEventsBySystemCodeErrorAction
