import {Dispatch} from 'redux';
import {AuthAction, AuthActionTypes} from '../types/authTypes';
import {AuthService} from '../../api/services/AuthService';

export const setAuth = (isAuth: boolean): AuthAction => {
    return {type: AuthActionTypes.SET_AUTH, payload: isAuth};
};

export const setLoading = (isLoading: boolean): AuthAction => {
    return {type: AuthActionTypes.SET_LOADING, payload: isLoading};
};

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            dispatch(setAuth(true));
        } catch (e: any) {
            console.error(e.response.data.message?.[0]?.message || e.response.data.message);
        }
    };
};

export const registration = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await AuthService.registration(email, password);
        } catch (e: any) {
            console.error(e.response.data.message?.[0]?.message || e.response.data.message);
        }
    };
};

export const logout = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if(refreshToken) {
                await AuthService.logout(refreshToken);
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                dispatch(setAuth(false));
            }
        } catch (e: any) {
            console.error(e.response.data.message?.[0]?.message || e.response.data.message);
        }
    };
};

export const checkAuth = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        setLoading(true);
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if(refreshToken) {
                const response = await AuthService.refresh(refreshToken);
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                dispatch(setAuth(true));
            }
        } catch (e: any) {
            console.error(e.response.data.message?.[0]?.message || e.response.data.message);
        } finally {
            setLoading(false);
        }
    };
};
