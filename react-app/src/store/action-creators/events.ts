import {Dispatch} from 'redux';
import {EventsAction, EventsActionTypes} from '../types/eventsTypes';
import {EventsService} from '../../api/services/EventsService';

export const fetchEventsBySystemCode = (code: string): any => {
    return async (dispatch: Dispatch<EventsAction>) => {
        try {
            dispatch({type: EventsActionTypes.FETCH_EVENTS_SYSTEM_CODE});
            const response = await EventsService.fetchEventsBySystemCode(code);
            if (response) {
                dispatch({type: EventsActionTypes.FETCH_EVENTS_SYSTEM_CODE_SUCCESS, payload: response.data});
            }
        } catch (e) {
            dispatch({type: EventsActionTypes.FETCH_EVENTS_SYSTEM_CODE_ERROR, payload: 'Произошла ошибка загрузки систем: ' + e});
        }
    };
};
