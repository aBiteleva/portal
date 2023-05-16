import {ActiveRulesAction, ActiveRulesActionTypes, ActiveRulesState, RulesPerformance} from '../types/activeRulesTypes';

const initialState: ActiveRulesState = {
    activeRules: [],
    isLoading: false,
    error: null,
    currentPerformance: RulesPerformance.tag,
    currentActiveRule: {
        code: '',
        description: '',
        condition: null,
        action: null,
        event: []
    }
};

export const activeRulesReducer = (state = initialState, action: ActiveRulesAction): ActiveRulesState => {
    switch (action.type) {
        case ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE:
            return {...state, isLoading: true, error: null, activeRules: []};
        case ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE_SUCCESS:
            return {...state, isLoading: false, error: null, activeRules: action.payload};
        case ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE_ERROR:
            return {...state, isLoading: false, error: action.payload, activeRules: []};
        case ActiveRulesActionTypes.SET_CURRENT_PERFORMANCE:
            return {...state, currentPerformance: action.payload};
        case ActiveRulesActionTypes.SET_CURRENT_ACTIVE_RULE:
            return {...state, currentActiveRule: action.payload};
        default:
            return state;
    }
};
