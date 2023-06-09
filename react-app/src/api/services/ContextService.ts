import {AxiosResponse} from 'axios';
import api from '../htttp';
import {ContextParamsInterface} from '../../store/types/contextTypes';

export class ContextService {
    static async fetchContext(): Promise<AxiosResponse<ContextParamsInterface[]>> {
        return api.get<ContextParamsInterface[]>('/context-param');
    }
}

