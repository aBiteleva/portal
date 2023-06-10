import {
    EditorActiveRulesAction,
    EditorActiveRulesActionTypes,
    EditorActiveRulesState,
    EditorRulesPerformance
} from '../types/editorActiveRulesTypes';

const initialState: EditorActiveRulesState = {
    currentEditorRulePerformance: EditorRulesPerformance.list
};

export const editorActiveRulesReducer = (state = initialState, action: EditorActiveRulesAction): EditorActiveRulesState => {
    switch (action.type) {
        case EditorActiveRulesActionTypes.SET_CURRENT_EDITOR_PERFORMANCE:
            return {...state, currentEditorRulePerformance: action.payload};
        default:
            return state;
    }
};
