export interface AuthState {
    isAuth: boolean,
    isLoading: boolean
}

export enum AuthActionTypes {
    SET_AUTH = 'SET_AUTH',
    SET_LOADING = 'SET_LOADING',
    LOGIN = 'LOGIN',
    REGISTRATION = 'REGISTRATION',
    LOGOUT = 'LOGOUT'
}

interface SetAuthAction {
    type: AuthActionTypes.SET_AUTH;
    payload: boolean;
}

interface SetLoadingAction {
    type: AuthActionTypes.SET_LOADING;
    payload: boolean;
}

interface LoginAction {
    type: AuthActionTypes.LOGIN;
}

interface RegistrationAction {
    type: AuthActionTypes.REGISTRATION;
}

interface LogoutAction {
    type: AuthActionTypes.LOGOUT;
}

export type AuthAction = SetAuthAction | SetLoadingAction | LoginAction | RegistrationAction | LogoutAction
