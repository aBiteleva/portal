import {EventComponentInterface} from './eventsTypes';

export interface ComponentInterface {
    name: string,
    code: string,
    description: string,
    system: {
        code: string,
        name: string
    },
    role: {name: string, description: string}[],
    event: EventComponentInterface[]
}

export interface ComponentState {
    component: ComponentInterface[] | [],
    isLoading: boolean,
    error: string | null,
}

export enum ComponentActionTypes {
    FETCH_COMPONENT = 'FETCH_COMPONENT',
    FETCH_COMPONENT_SUCCESS = 'FETCH_COMPONENT_SUCCESS',
    FETCH_COMPONENT_ERROR = 'FETCH_COMPONENT_ERROR'
}

interface FetchComponentAction {
    type: ComponentActionTypes.FETCH_COMPONENT;
}

interface FetchComponentSuccessAction {
    type: ComponentActionTypes.FETCH_COMPONENT_SUCCESS;
    payload: ComponentInterface[];
}

interface FetchComponentErrorAction {
    type: ComponentActionTypes.FETCH_COMPONENT_ERROR;
    payload: string;
}

export type ComponentAction = FetchComponentAction | FetchComponentSuccessAction | FetchComponentErrorAction;
