import {AxiosResponse} from "axios";
import api from "../htttp";
import {AddSystemInterface, DeleteSystemInterface, SystemsInterface} from "../../store/types/systemsTypes";

export class SystemService {
    static async fetchSystems(attached: boolean = true): Promise<AxiosResponse<SystemsInterface[]>> {
        return api.get<SystemsInterface[]>(`/system?attached=${attached}`);
    }

    static async addSystem(body: AddSystemInterface): Promise<AxiosResponse<any[]>> {
        return api.post<any[]>(`/system`, body);
    }

    static async deleteSystem(data: DeleteSystemInterface): Promise<AxiosResponse<any[]>> {
        return api.delete<any[]>(`/system`, {data});
    }
    }

