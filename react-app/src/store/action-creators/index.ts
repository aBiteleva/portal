import * as AuthActionCreators from './auth';
import * as SystemsActionCreators from './systems';
import * as ActiveRulesActionCreators from './activeRules';
import * as EditorActiveRulesActionCreators from './editorActiveRules';
import * as EventsActionCreators from './events';
import * as ContextCreators from './context';
import * as ComponentCreators from './component';

export default {
    ...AuthActionCreators,
    ...SystemsActionCreators,
    ...ActiveRulesActionCreators,
    ...EditorActiveRulesActionCreators,
    ...EventsActionCreators,
    ...ContextCreators,
    ...ComponentCreators
};
