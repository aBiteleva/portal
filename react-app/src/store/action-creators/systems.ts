import {SystemsAction, SystemsActionTypes} from '../types/systemsTypes';
import {Dispatch} from 'redux';
import {mock} from '../../components/SystemPage/resources/mock';

export const setCurrentSystem = (system: string): SystemsAction => {
    return {type: SystemsActionTypes.SET_CURRENT_SYSTEM, payload: system};
};

export const fetchSystems = () => {
    return (dispatch: Dispatch<SystemsAction>) => {
        try {
            dispatch({type: SystemsActionTypes.FETCH_SYSTEM});
            const response = mock;
            if (response) {
                dispatch({type: SystemsActionTypes.FETCH_SYSTEM_SUCCESS, payload: response});
            }
        } catch (e) {
            dispatch({type: SystemsActionTypes.FETCH_SYSTEM_ERROR, payload: 'Произошла ошибка загрузки систем: ' + e});
        }
    };
};
