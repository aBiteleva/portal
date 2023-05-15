import {Dispatch} from 'redux';
import {
    AddEventInterface,
    DeleteEventInterface,
    EventsAction,
    EventsActionTypes,
    EventsInterface
} from '../types/eventsTypes';
import {EventsService} from '../../api/services/EventsService';

export const setCurrentEvent = (event: EventsInterface): EventsAction => {
    return {type: EventsActionTypes.SET_CURRENT_EVENT, payload: event};
};

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

export const addEvent = (body: AddEventInterface, currentSystemCode: string) => {
    return async (dispatch: Dispatch<EventsAction>) => {
        try {
            await EventsService.addEvent(body);
            dispatch(fetchEventsBySystemCode(currentSystemCode));
        } catch (e) {
            console.error('Произошла ошибка добавления события: ', e);
        }
    };
};

export const deleteEvent = (body: DeleteEventInterface, currentSystemCode: string) => {
    return async (dispatch: Dispatch<EventsAction>) => {
        try {
            await EventsService.deleteEvent(body);
            dispatch(fetchEventsBySystemCode(currentSystemCode));
        } catch (e) {
            console.error('Произошла ошибка удаления системы: ', e);
        }
    };
};
