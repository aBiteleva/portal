import {Dispatch} from 'redux';
import {ComponentAction, ComponentActionTypes} from '../types/componentTypes';
import {ComponentService} from '../../api/services/ComponentService';
import {SystemsAction} from '../types/systemsTypes';
import {fetchSystems} from './systems';

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

export const addComponent = (name: string, system: string) => {
    return async (dispatch: Dispatch<SystemsAction>) => {
        try {
            const res = await ComponentService.addComponent(name);

            if(res){
                //@ts-ignore
                await ComponentService.addComponentSystem({codeComponent: res.data.code, codeSystem: system});
            }

            dispatch(fetchSystems());
        } catch (e) {
            console.error('Произошла ошибка добавления системы: ', e);
        }
    };
};
