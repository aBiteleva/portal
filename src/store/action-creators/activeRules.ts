import {Dispatch} from 'redux';
import {ActiveRulesAction, ActiveRulesActionTypes} from "../types/activeRulesTypes";
import {ActiveRuleService} from "../../api/services/ActiveRuleService";

export const fetchActiveRuleBySystemCode = (code: string): any => {
    return async (dispatch: Dispatch<ActiveRulesAction>) => {
        try {
            dispatch({type: ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE});
            const response = await ActiveRuleService.fetchActiveRuleBySystemCode(code);
            if (response) {
                dispatch({type: ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE_SUCCESS, payload: response.data});
            }
        } catch (e) {
            dispatch({type: ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE_ERROR, payload: 'Произошла ошибка загрузки систем: ' + e});
        }
    };
};

