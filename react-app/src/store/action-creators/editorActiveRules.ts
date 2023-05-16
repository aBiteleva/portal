import {
    EditorActiveRulesAction,
    EditorActiveRulesActionTypes,
    EditorRulesPerformance
} from '../types/editorActiveRulesTypes';

export const setCurrentEditorRulePerformance = (performance: EditorRulesPerformance): EditorActiveRulesAction => {
    return {type: EditorActiveRulesActionTypes.SET_CURRENT_EDITOR_PERFORMANCE, payload: performance};
};
