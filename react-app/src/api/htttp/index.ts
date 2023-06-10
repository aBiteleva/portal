import axios from 'axios';
import {AuthService} from '../services/AuthService';

export const STATIC_URL = 'http://localhost:4000';

const api = axios.create({
    withCredentials: true,
    baseURL: STATIC_URL
});

api.interceptors.request.use(config => {
    if(config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    }
    return;
});

api.interceptors.response.use(config => {
    return config;
}, async error => {
    const originalRequest = error.config;
    if(error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = refreshToken && await AuthService.refresh(refreshToken);
            return api.request(originalRequest);

        } catch (e) {
            console.error('Не авторизован');
        }
    }
    throw error;

});

export default api;
