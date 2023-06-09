import {Dispatch} from 'redux';
import {ComponentAction, ComponentActionTypes} from '../types/componentTypes';
import {ComponentService} from '../../api/services/ComponentService';

export const fetchComponentParams = (): any => {
    return async (dispatch: Dispatch<ComponentAction>) => {
        try {
            dispatch({type: ComponentActionTypes.FETCH_COMPONENT});
            const response = await ComponentService.fetchComponent();
            if (response) {
                dispatch({type: ComponentActionTypes.FETCH_COMPONENT_SUCCESS, payload: response.data});
            }
        } catch (e) {
            dispatch({type: ComponentActionTypes.FETCH_COMPONENT_ERROR, payload: 'Произошла ошибка загрузки контекста событий: ' + e});
        }
    };
};
