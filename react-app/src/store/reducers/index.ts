import {combineReducers} from 'redux';
import {systemsReducer} from './systemsReducer';
import {authReducer} from './authReducer';
import {activeRulesReducer} from './activeRulesReducer';
import {editorActiveRulesReducer} from './editorActiveRulesReducer';
import {eventsReducer} from './eventsReducer';
import {contextReducer} from './contextReducer';
import {componentReducer} from './componentReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    systemsValues: systemsReducer,
    activeRulesValues: activeRulesReducer,
    editorActiveRulesValues: editorActiveRulesReducer,
    eventsValues: eventsReducer,
    contextParamsValues: contextReducer,
    componentValues: componentReducer
});

export type RootState = ReturnType<typeof rootReducer>
