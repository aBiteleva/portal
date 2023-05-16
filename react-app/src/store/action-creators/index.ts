import * as AuthActionCreators from './auth';
import * as SystemsActionCreators from './systems';
import * as ActiveRulesActionCreators from './activeRules';
import * as EditorActiveRulesActionCreators from './editorActiveRules';
import * as EventsActionCreators from './events';

export default {
    ...AuthActionCreators,
    ...SystemsActionCreators,
    ...ActiveRulesActionCreators,
    ...EditorActiveRulesActionCreators,
    ...EventsActionCreators
};
