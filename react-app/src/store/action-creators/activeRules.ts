import {Dispatch} from 'redux';
import {
    ActiveRulesAction,
    ActiveRulesActionTypes,
    ActiveRulesInterface, AddActiveRuleInterface, DeleteActiveRuleInterface,
    RulesPerformance, UpdateActiveRuleInterface
} from '../types/activeRulesTypes';
import {ActiveRuleService} from '../../api/services/ActiveRuleService';

export const setCurrentPerformance = (performance: RulesPerformance): ActiveRulesAction => {
    return {type: ActiveRulesActionTypes.SET_CURRENT_PERFORMANCE, payload: performance};
};

export const setCurrentActiveRule = (activeRule: ActiveRulesInterface | null): any => {
    return (dispatch: Dispatch<ActiveRulesAction>) => {
        dispatch({type: ActiveRulesActionTypes.SET_CURRENT_ACTIVE_RULE, payload: activeRule});
    };
};

export const fetchActiveRuleBySystemCode = (code: string): any => {
    return async (dispatch: Dispatch<ActiveRulesAction>) => {
        try {
            dispatch({type: ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE});
            const response = await ActiveRuleService.fetchActiveRuleBySystemCode(code);
            if (response) {
                dispatch({type: ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE_SUCCESS, payload: response.data});
            }
        } catch (e) {
            dispatch({
                type: ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE_ERROR,
                payload: 'Произошла ошибка загрузки систем: ' + e
            });
        }
    };
};

export const addActiveRule = (body: AddActiveRuleInterface, eventData: { codeEvent: string, typeBind: string },
                              currentSystemCode: string) => {
    return async (dispatch: Dispatch<ActiveRulesAction>) => {
        try {
            const activeRule = await ActiveRuleService.addActiveRule(body);
            if (activeRule) {
                await ActiveRuleService.bindActiveRuleEvent({
                    //@ts-ignore
                    codeRule: activeRule.data.code,
                    codeEvent: eventData.codeEvent, typeBind: eventData.typeBind
                });
                dispatch(fetchActiveRuleBySystemCode(currentSystemCode));
            }

        } catch (e) {
            console.error('Произошла ошибка добавления активного правила: ', e);
        }
    };
};

export const updateActiveRule = (body: UpdateActiveRuleInterface, currentSystemCode: string) => {
    return async (dispatch: Dispatch<ActiveRulesAction>) => {
        try {
            const res = await ActiveRuleService.updateActiveRule(body);
            if(res) {
                dispatch(fetchActiveRuleBySystemCode(currentSystemCode));
                localStorage.removeItem('currentActiveRuleObject');
                localStorage.setItem('currentActiveRuleObject', JSON.stringify(res.data));
            }

        } catch (e) {
            console.error('Произошла ошибка добавления активного правила: ', e);
        }
    };
};

export const deleteActiveRule = (body: DeleteActiveRuleInterface, currentSystemCode: string) => {
    return async (dispatch: Dispatch<ActiveRulesAction>) => {
        try {
            await ActiveRuleService.deleteActiveRule(body);
            dispatch(fetchActiveRuleBySystemCode(currentSystemCode));
        } catch (e) {
            console.error('Произошла ошибка удаления активного правила: ', e);
        }
    };
};

