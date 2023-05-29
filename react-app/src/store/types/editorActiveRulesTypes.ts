export enum EditorRulesPerformance {
    list= 'list',
    lang = 'lang',
    graph = 'graph',
}

export interface EditorActiveRulesState {
    currentEditorRulePerformance: EditorRulesPerformance
}

export enum EditorActiveRulesActionTypes {
    SET_CURRENT_EDITOR_PERFORMANCE = 'SET_CURRENT_EDITOR_PERFORMANCE'
}

export interface EditorActiveRulesAction {
    type: EditorActiveRulesActionTypes.SET_CURRENT_EDITOR_PERFORMANCE;
    payload: EditorRulesPerformance;
}

// export type EditorActiveRulesAction = SetCurrentEditorPerformanceAction';
