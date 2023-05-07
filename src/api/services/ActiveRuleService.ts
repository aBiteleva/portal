import {AxiosResponse} from "axios";
import api from "../htttp";
import {ActiveRulesInterface} from "../../store/types/activeRulesTypes";

export class ActiveRuleService {
    static async fetchActiveRuleBySystemCode(code: string = '00016'): Promise<AxiosResponse<ActiveRulesInterface[]>> {
        return api.get<ActiveRulesInterface[]>(`/active-rule/system/${code}`);
    }
}

