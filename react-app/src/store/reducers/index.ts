import {combineReducers} from 'redux';
import {systemsReducer} from './systemsReducer';
import {authReducer} from './authReducer';
import {activeRulesReducer} from './activeRulesReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    systemsValues: systemsReducer,
    activeRulesValues: activeRulesReducer
});

export type RootState = ReturnType<typeof rootReducer>
