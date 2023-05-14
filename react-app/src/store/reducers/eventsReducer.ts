import {EventsAction, EventsActionTypes, EventsState} from '../types/eventsTypes';

const initialState: EventsState = {
    events: [],
    isLoading: false,
    error: null
};

export const eventsReducer = (state = initialState, action: EventsAction): EventsState => {
    switch (action.type) {
        case EventsActionTypes.FETCH_EVENTS_SYSTEM_CODE:
            return {...state, isLoading: true, error: null, events: []};
        case EventsActionTypes.FETCH_EVENTS_SYSTEM_CODE_SUCCESS:
            return {...state, isLoading: false, error: null, events: action.payload};
        case EventsActionTypes.FETCH_EVENTS_SYSTEM_CODE_ERROR:
            return {...state, isLoading: false, error: action.payload, events: []};
        default:
            return state;
    }
};
