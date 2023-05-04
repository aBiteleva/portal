import {ActiveRulesAction, ActiveRulesActionTypes, ActiveRulesState} from "../types/activeRulesTypes";

const initialState: ActiveRulesState = {
    activeRules: [],
    isLoading: false,
    error: null
};

export const activeRulesReducer = (state = initialState, action: ActiveRulesAction): ActiveRulesState => {
    switch (action.type) {
        case ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE:
            return {...state, isLoading: true, error: null, activeRules: []};
        case ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE_SUCCESS:
            return {...state, isLoading: false, error: null, activeRules: action.payload};
        case ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE_ERROR:
            return {...state, isLoading: false, error: action.payload, activeRules: []};
        default:
            return state;
    }
};
