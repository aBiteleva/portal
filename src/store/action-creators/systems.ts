import {SystemsAction, SystemsActionTypes} from '../types/systemsTypes';
import {Dispatch} from 'redux';
import {mock} from '../../components/SystemPage/resources/mock';
import {systemService} from '../../api/services/SystemService';

export const setCurrentSystem = (system: string): SystemsAction => {
    return {type: SystemsActionTypes.SET_CURRENT_SYSTEM, payload: system};
};

export const fetchSystems = () => {
    return (dispatch: Dispatch<SystemsAction>) => {
        try {
            dispatch({type: SystemsActionTypes.FETCH_SYSTEM});
            const response = mock;
            const test = systemService.systemList();
            console.log({test});
            if (response) {
                dispatch({type: SystemsActionTypes.FETCH_SYSTEM_SUCCESS, payload: response});
            }
        } catch (e) {
            dispatch({type: SystemsActionTypes.FETCH_SYSTEM_ERROR, payload: 'Произошла ошибка загрузки систем: ' + e});
        }
    };
};
