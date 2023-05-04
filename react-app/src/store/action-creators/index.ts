import * as SystemsActionCreators from './systems';
import * as AuthActionCreators from './auth';


export default {
    ...SystemsActionCreators,
    ...AuthActionCreators
};
