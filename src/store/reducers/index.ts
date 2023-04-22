import {combineReducers} from "redux";
import {systemsReducer} from "./systemsReducer";

export const rootReducer = combineReducers({
    systemsValues: systemsReducer,
});

export type RootState = ReturnType<typeof rootReducer>
