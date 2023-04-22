export interface SystemsState {
    systems: any[],
    currentSystem: string | null,
    loading: boolean,
    error: string | null
}

export enum SystemsActionTypes {
    SET_CURRENT_SYSTEM = "SET_CURRENT_SYSTEM"
}

interface SetCurrentSystemAction {
    type: SystemsActionTypes.SET_CURRENT_SYSTEM;
    payload: string;
}

export type SystemsAction = SetCurrentSystemAction
