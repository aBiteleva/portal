import {SystemPagesWayInterface, SystemsAction, SystemsActionTypes, SystemsInterface} from '../types/systemsTypes';
import {Dispatch} from 'redux';
import {SystemService} from '../../api/services/SystemService';

export const setCurrentSystem = (system: SystemsInterface): SystemsAction => {
    return {type: SystemsActionTypes.SET_CURRENT_SYSTEM, payload: system};
};

export const setCurrentSystems = (systems: SystemsInterface[]): SystemsAction => {
    return {type: SystemsActionTypes.SET_CURRENT_SYSTEMS, payload: systems};
};

export const setSystemPagesWay = (systemPagesWay: SystemPagesWayInterface[]): SystemsAction => {
    return {type: SystemsActionTypes.SET_SYSTEM_PAGES_WAY, payload: systemPagesWay};
};

export const fetchSystems = () => {
    return async (dispatch: Dispatch<SystemsAction>) => {
        try {
            dispatch({type: SystemsActionTypes.FETCH_SYSTEM});
            const response = await SystemService.fetchSystems(true);
            if (response) {
                dispatch({type: SystemsActionTypes.FETCH_SYSTEM_SUCCESS, payload: response.data});
            }
        } catch (e) {
            dispatch({type: SystemsActionTypes.FETCH_SYSTEM_ERROR, payload: 'Произошла ошибка загрузки систем: ' + e});
        }
    };
};
