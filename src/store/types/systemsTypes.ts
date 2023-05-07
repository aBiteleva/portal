export interface SystemsInterface {
    name: string,
    code: string,
    children: SystemsInterface[],
    parentCode?: string
}

export interface AddSystemInterface {
    name: string
}

export interface DeleteSystemInterface {
    code: string,
    confirmAttach: boolean,
    confirmComponent: boolean
}

export interface SystemPagesWayInterface {
    name: string,
    code: string,
    systems: SystemsInterface[]
}

export interface SystemsState {
    systems: SystemsInterface[] | [],
    currentSystem: SystemsInterface,
    currentSystems: SystemsInterface[] | [],
    isLoading: boolean,
    error: string | null,
    systemPagesWay: SystemPagesWayInterface[]
}

export enum SystemsActionTypes {
    SET_CURRENT_SYSTEM = 'SET_CURRENT_SYSTEM',
    SET_CURRENT_SYSTEMS = 'SET_CURRENT_SYSTEMS',
    SET_SYSTEM_PAGES_WAY = 'SET_SYSTEM_PAGES_WAY',
    FETCH_SYSTEM = 'FETCH_SYSTEM',
    FETCH_SYSTEM_SUCCESS = 'FETCH_SYSTEM_SUCCESS',
    FETCH_SYSTEM_ERROR = 'FETCH_SYSTEM_ERROR'
}

interface SetCurrentSystemAction {
    type: SystemsActionTypes.SET_CURRENT_SYSTEM;
    payload: SystemsInterface;
}

interface SetCurrentSystemsAction {
    type: SystemsActionTypes.SET_CURRENT_SYSTEMS;
    payload: SystemsInterface[];
}

interface SetSystemPagesWayAction {
    type: SystemsActionTypes.SET_SYSTEM_PAGES_WAY;
    payload: SystemPagesWayInterface[];
}

interface FetchSystemsAction {
    type: SystemsActionTypes.FETCH_SYSTEM;
}

interface FetchSystemsSuccessAction {
    type: SystemsActionTypes.FETCH_SYSTEM_SUCCESS;
    payload: SystemsInterface[];
}

interface FetchSystemsErrorAction {
    type: SystemsActionTypes.FETCH_SYSTEM_ERROR;
    payload: string;
}

export type SystemsAction = SetCurrentSystemAction | SetCurrentSystemsAction |
    SetSystemPagesWayAction | FetchSystemsAction | FetchSystemsSuccessAction | FetchSystemsErrorAction
