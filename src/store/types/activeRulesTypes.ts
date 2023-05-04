interface EventResponse {
    code: string
    description: string
    categoryEvent: string
    component: {code: string, description: string}[]
}

export interface ActiveRulesInterface {
    code: string,
    description: string,
    condition: {} | any
    action: {} | any
    event: EventResponse[]
}


export interface ActiveRulesState {
    activeRules: ActiveRulesInterface[],
    isLoading: boolean,
    error: string | null
}

export enum ActiveRulesActionTypes {
    FETCH_RULES_SYSTEM_CODE = 'FETCH_RULES_SYSTEM_CODE',
    FETCH_RULES_SYSTEM_CODE_SUCCESS = 'FETCH_RULES_SYSTEM_CODE_SUCCESS',
    FETCH_RULES_SYSTEM_CODE_ERROR = 'FETCH_RULES_SYSTEM_CODE_ERROR'
}

interface FetchActiveRulesBySystemCodeAction {
    type: ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE;
}

interface FetchActiveRulesBySystemCodeSuccessAction {
    type: ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE_SUCCESS;
    payload: ActiveRulesInterface[];
}

interface FetchActiveRulesBySystemCodeErrorAction {
    type: ActiveRulesActionTypes.FETCH_RULES_SYSTEM_CODE_ERROR;
    payload: string;
}

export type ActiveRulesAction = FetchActiveRulesBySystemCodeAction
    | FetchActiveRulesBySystemCodeSuccessAction |FetchActiveRulesBySystemCodeErrorAction
