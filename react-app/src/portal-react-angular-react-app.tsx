import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import App from './App';
import {createStore, applyMiddleware, Store} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {rootReducer} from './store/reducers';

const store: Store<any> & {
    dispatch: any
} = createStore(rootReducer, applyMiddleware(thunk));
const lifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: (props) => (
        <Provider store={store}>
            <App {...props}/>
        </Provider>
    ),
    // errorBoundary(err, info, props) {
    //     // Customize the root error boundary for your microfrontend here.
    //     return null;
    // },
});

export const {bootstrap, mount, unmount} = lifecycles;
export type AppDispatch = typeof store.dispatch;
