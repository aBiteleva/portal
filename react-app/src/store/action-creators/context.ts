import {Dispatch} from 'redux';
import {ContextAction, ContextActionTypes} from '../types/contextTypes';
import {ContextService} from '../../api/services/ContextService';

export const fetchContextParams = (): any => {
    return async (dispatch: Dispatch<ContextAction>) => {
        try {
            dispatch({type: ContextActionTypes.FETCH_CONTEXT});
            const response = await ContextService.fetchContext();
            if (response) {
                dispatch({type: ContextActionTypes.FETCH_CONTEXT_SUCCESS, payload: response.data});
            }
        } catch (e) {
            dispatch({type: ContextActionTypes.FETCH_CONTEXT_ERROR, payload: 'Произошла ошибка загрузки контекста событий: ' + e});
        }
    };
};
