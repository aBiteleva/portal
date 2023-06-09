import {ContextAction, ContextActionTypes, ContextState} from '../types/contextTypes';

const initialState: ContextState = {
    contextParams: [],
    isLoading: false,
    error: null
};

export const contextReducer = (state = initialState, action: ContextAction): ContextState => {
    switch (action.type) {
        case ContextActionTypes.FETCH_CONTEXT:
            return {...state, isLoading: true, error: null, contextParams: []};
        case ContextActionTypes.FETCH_CONTEXT_SUCCESS:
            return {...state, isLoading: false, error: null, contextParams: action.payload};
        case ContextActionTypes.FETCH_CONTEXT_ERROR:
            return {...state, isLoading: false, error: action.payload, contextParams: []};
        default:
            return state;
    }
};
