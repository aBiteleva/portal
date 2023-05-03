import {AxiosResponse} from "axios";
import api from "../htttp";

export class SystemService {
    static async fetchSystems(attached: boolean = true): Promise<AxiosResponse<any[]>> {
        return api.get<any[]>(`/system?attached=${attached}`)
    }
}

