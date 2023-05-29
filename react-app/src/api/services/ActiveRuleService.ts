import {AxiosResponse} from 'axios';
import api from '../htttp';
import {ActiveRulesInterface, AddActiveRuleInterface, DeleteActiveRuleInterface} from '../../store/types/activeRulesTypes';

export class ActiveRuleService {
    static async fetchActiveRuleBySystemCode(code: string = '00016'): Promise<AxiosResponse<ActiveRulesInterface[]>> {
        return api.get<ActiveRulesInterface[]>(`/active-rule/system/${code}`);
    }

    static async addActiveRule(body: AddActiveRuleInterface): Promise<AxiosResponse<any[]>> {
        return api.post<any[]>('/active-rule', body);
    }

    static async deleteActiveRule(data: DeleteActiveRuleInterface): Promise<AxiosResponse<any[]>> {
        return api.delete<any[]>('/active-rule', {data});
    }
}

