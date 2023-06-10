import {ComponentAction, ComponentActionTypes, ComponentState} from '../types/componentTypes';

const initialState: ComponentState = {
    component: [],
    isLoading: false,
    error: null
};

export const componentReducer = (state = initialState, action: ComponentAction): ComponentState => {
    switch (action.type) {
        case ComponentActionTypes.FETCH_COMPONENT:
            return {...state, isLoading: true, error: null, component: []};
        case ComponentActionTypes.FETCH_COMPONENT_SUCCESS:
            return {...state, isLoading: false, error: null, component: action.payload};
        case ComponentActionTypes.FETCH_COMPONENT_ERROR:
            return {...state, isLoading: false, error: action.payload, component: []};
        default:
            return state;
    }
};
