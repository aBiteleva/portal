export interface SystemsState {
    systems: any[],
    currentSystem: string | null,
    loading: boolean,
    error: string | null
}

export enum SystemsActionTypes {
    SET_CURRENT_SYSTEM = 'SET_CURRENT_SYSTEM',
    FETCH_SYSTEM = 'FETCH_SYSTEM',
    FETCH_SYSTEM_SUCCESS = 'FETCH_SYSTEM_SUCCESS',
    FETCH_SYSTEM_ERROR = 'FETCH_SYSTEM_ERROR'
}

interface SetCurrentSystemAction {
    type: SystemsActionTypes.SET_CURRENT_SYSTEM;
    payload: string;
}

interface FetchSystemsAction {
    type: SystemsActionTypes.FETCH_SYSTEM;
}

interface FetchSystemsSuccessAction {
    type: SystemsActionTypes.FETCH_SYSTEM_SUCCESS;
    payload: any[];
}

interface FetchSystemsErrorAction {
    type: SystemsActionTypes.FETCH_SYSTEM_ERROR;
    payload: string;
}


export type SystemsAction = SetCurrentSystemAction | FetchSystemsAction | FetchSystemsSuccessAction | FetchSystemsErrorAction
