import {ContextParamsInterface} from './contextTypes';

export interface EventComponentInterface {
    code: string
    description: string,
    categoryEvent: string,
    contextParam: ContextParamsInterface
}

export interface EventsInterface {
    code: string,
    description: string,
    categoryEvent: string,
    component: EventComponentInterface[],
    contextParam: {
        code: string,
        dataType: string,
        description: string,
        name: string
    }
}

export interface EventsState {
    currentEvent: EventsInterface,
    events: EventsInterface[],
    isLoading: boolean,
    error: string | null
}

export interface AddEventInterface {
    description: string,
    contextParamCode: string,
    codeComponent: string
}

export interface DeleteEventInterface {
    codeEvent: string,
    codeComponent: string
}

export enum EventsActionTypes {
    FETCH_EVENTS_SYSTEM_CODE = 'FETCH_EVENTS_SYSTEM_CODE',
    FETCH_EVENTS_SYSTEM_CODE_SUCCESS = 'FETCH_EVENTS_SYSTEM_CODE_SUCCESS',
    FETCH_EVENTS_SYSTEM_CODE_ERROR = 'FETCH_EVENTS_SYSTEM_CODE_ERROR',
    SET_CURRENT_EVENT = 'SET_CURRENT_EVENT',
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

interface SetCurrentEventAction {
    type: EventsActionTypes.SET_CURRENT_EVENT;
    payload: EventsInterface;
}

export type EventsAction = FetchEventsBySystemCodeAction
    | FetchEventsBySystemCodeSuccessAction | FetchEventsBySystemCodeErrorAction | SetCurrentEventAction
