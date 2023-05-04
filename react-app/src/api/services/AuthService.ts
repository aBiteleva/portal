import api from "../htttp";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

export class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/auth/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<void>> {
        return api.post('/auth/registration', {email, password})
    }

    static async logout(refreshToken: string): Promise<AxiosResponse<void>> {
        return api.post('/auth/logout', {refreshToken});
    }

    static async refresh(refreshToken: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/auth/refresh', {refreshToken});
    }
}
