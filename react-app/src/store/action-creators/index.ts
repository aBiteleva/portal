import * as AuthActionCreators from './auth';
import * as SystemsActionCreators from './systems';
import * as ActiveRulesActionCreators from './activeRules';

export default {
    ...AuthActionCreators,
    ...SystemsActionCreators,
    ...ActiveRulesActionCreators
};
