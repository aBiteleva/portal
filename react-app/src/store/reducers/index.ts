import {combineReducers} from 'redux';
import {systemsReducer} from './systemsReducer';
import {authReducer} from './authReducer';
import {activeRulesReducer} from './activeRulesReducer';
import {editorActiveRulesReducer} from './editorActiveRulesReducer';
import {eventsReducer} from './eventsReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    systemsValues: systemsReducer,
    activeRulesValues: activeRulesReducer,
    editorActiveRulesValues: editorActiveRulesReducer,
    eventsValues: eventsReducer
});

export type RootState = ReturnType<typeof rootReducer>
