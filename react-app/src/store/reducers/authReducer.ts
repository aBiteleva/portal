import {AuthAction, AuthActionTypes, AuthState} from '../types/authTypes';


const initialState: AuthState = {
    isAuth: false,
    isLoading: false
};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type){
        case AuthActionTypes.SET_AUTH:
            return {...state, isAuth: action.payload};
        case AuthActionTypes.SET_LOADING:
            return {...state, isLoading: action.payload};
        case AuthActionTypes.LOGIN:
            return {...state};
        case AuthActionTypes.REGISTRATION:
            return {...state};
        case AuthActionTypes.LOGOUT:
            return {...state};
        default:
            return state;
    }
};
