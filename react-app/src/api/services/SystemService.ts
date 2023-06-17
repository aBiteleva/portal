import {AxiosResponse} from 'axios';
import api from '../htttp';
import {AddSystemInterface, DeleteSystemInterface, SystemsInterface} from '../../store/types/systemsTypes';

export class SystemService {
    static async fetchSystems(attached: boolean = true): Promise<AxiosResponse<SystemsInterface[]>> {
        return api.get<SystemsInterface[]>(`/system?attached=${attached}`);
    }

    static async fetchSystemByCode(systemCode: string, attached: boolean = true): Promise<AxiosResponse<SystemsInterface>> {
        return api.get<SystemsInterface>(`/system/${systemCode}?attached=${attached}`);
    }

    static async addSystem(body: AddSystemInterface): Promise<AxiosResponse<any[]>> {
        return api.post<any[]>('/system', body);
    }

    static async addSystemAttachment(body: {
        codeParent: string,
        codeAttach: string
    }): Promise<AxiosResponse<any[]>> {
        return api.post<any[]>('/system/attachment', body);
    }

    static async deleteSystem(data: DeleteSystemInterface): Promise<AxiosResponse<any[]>> {
        return api.delete<any[]>('/system', {data});
    }
}

