import React from 'react'
import {createRoot} from 'react-dom/client'
import App from "./App";
import { createStore, applyMiddleware, Store } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import {rootReducer} from "./store/reducers";

const container = document.getElementById('app-root')!
const store: Store<any> & {
    dispatch: any
} = createStore(rootReducer, applyMiddleware(thunk))
const root = createRoot(container)
root.render(
    <Provider store={store}>
        <App/>
    </Provider>)
