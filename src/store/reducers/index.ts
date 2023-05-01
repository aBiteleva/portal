import {combineReducers} from "redux";
import {systemsReducer} from "./systemsReducer";
import {authReducer} from "./authReducer";

export const rootReducer = combineReducers({
    systemsValues: systemsReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>
