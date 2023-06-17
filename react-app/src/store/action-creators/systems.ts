import {
    AddSystemInterface, DeleteSystemInterface,
    SystemPagesWayInterface,
    SystemsAction,
    SystemsActionTypes,
    SystemsInterface
} from '../types/systemsTypes';
import {Dispatch} from 'redux';
import {SystemService} from '../../api/services/SystemService';
import {ActiveRulesInterface} from '../types/activeRulesTypes';

export const setCurrentSystem = (system: SystemsInterface): SystemsAction => {
    return {type: SystemsActionTypes.SET_CURRENT_SYSTEM, payload: system};
};

export const setCurrentSystems = (systems: SystemsInterface[] | ActiveRulesInterface[]): SystemsAction => {
    return {type: SystemsActionTypes.SET_CURRENT_SYSTEMS, payload: systems};
};

export const setSystemPagesWay = (systemPagesWay: SystemPagesWayInterface[]): SystemsAction => {
    return {type: SystemsActionTypes.SET_SYSTEM_PAGES_WAY, payload: systemPagesWay};
};

export const fetchSystems = (): any => {
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

export const addSystem = (name: string, system: SystemsInterface) => {
    return async (dispatch: Dispatch<SystemsAction>) => {
        try {
            const newSystem = await SystemService.addSystem({name});
            if (newSystem) {
                //@ts-ignore
                await SystemService.addSystemAttachment({codeParent: system.code, codeAttach: newSystem.data.code});
                const updatedSystem = await SystemService.fetchSystemByCode(system.code);
                dispatch(fetchSystems());
                if(updatedSystem) {
                    dispatch(setCurrentSystems(updatedSystem.data.children));
                }
            }
        } catch (e) {
            console.error('Произошла ошибка добавления системы: ', e);
        }
    };
};

export const deleteSystem = (body: DeleteSystemInterface, parentCode?: string) => {
    return async (dispatch: Dispatch<SystemsAction>) => {
        try {
            await SystemService.deleteSystem(body);
            if(parentCode) {
                const updatedParentSystem = await SystemService.fetchSystemByCode(parentCode);
                dispatch(fetchSystems());
                if (updatedParentSystem) {
                    dispatch(setCurrentSystems(updatedParentSystem.data.children));
                }
            }
        } catch (e) {
            console.error('Произошла ошибка удаления системы: ', e);
        }
    };
};
