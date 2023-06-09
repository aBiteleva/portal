import {ActiveRulesInterface} from './activeRulesTypes';

export interface ContextParamsInterface {
    name: string,
    code: string,
    description: string,
    dataType: string
}

export interface ContextState {
    contextParams: ContextParamsInterface[] | [],
    isLoading: boolean,
    error: string | null,
}

export enum ContextActionTypes {
    FETCH_CONTEXT = 'FETCH_CONTEXT',
    FETCH_CONTEXT_SUCCESS = 'FETCH_CONTEXT_SUCCESS',
    FETCH_CONTEXT_ERROR = 'FETCH_CONTEXT_ERROR'
}

interface FetchContextAction {
    type: ContextActionTypes.FETCH_CONTEXT;
}

interface FetchContextSuccessAction {
    type: ContextActionTypes.FETCH_CONTEXT_SUCCESS;
    payload: ContextParamsInterface[];
}

interface FetchContextErrorAction {
    type: ContextActionTypes.FETCH_CONTEXT_ERROR;
    payload: string;
}

export type ContextAction = FetchContextAction | FetchContextSuccessAction | FetchContextErrorAction;
