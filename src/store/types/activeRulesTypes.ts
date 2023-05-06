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

export enum RulesPerformance {
    list= 'list',
    lang = 'lang',
    graph = 'graph',
    table = 'table'
}

export interface ActiveRulesState {
    activeRules: ActiveRulesInterface[],
    isLoading: boolean,
    error: string | null,
    currentPerformance: RulesPerformance
}

export enum ActiveRulesActionTypes {
    FETCH_RULES_SYSTEM_CODE = 'FETCH_RULES_SYSTEM_CODE',
    FETCH_RULES_SYSTEM_CODE_SUCCESS = 'FETCH_RULES_SYSTEM_CODE_SUCCESS',
    FETCH_RULES_SYSTEM_CODE_ERROR = 'FETCH_RULES_SYSTEM_CODE_ERROR',
    SET_CURRENT_PERFORMANCE = 'SET_CURRENT_PERFORMANCE'
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

interface SetCurrentPerformanceAction {
    type: ActiveRulesActionTypes.SET_CURRENT_PERFORMANCE;
    payload: RulesPerformance;
}

export type ActiveRulesAction = FetchActiveRulesBySystemCodeAction
    | FetchActiveRulesBySystemCodeSuccessAction |FetchActiveRulesBySystemCodeErrorAction | SetCurrentPerformanceAction
