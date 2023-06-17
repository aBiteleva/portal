import {AxiosResponse} from 'axios';
import api from '../htttp';
import {ComponentInterface} from '../../store/types/componentTypes';

export class ComponentService {
    static async fetchComponent(): Promise<AxiosResponse<ComponentInterface[]>> {
        return api.get<ComponentInterface[]>('/component');
    }

    static async addComponent(componentName: string): Promise<AxiosResponse<any[]>> {
        return api.post('/component', {description: componentName});
    }

    static async addComponentSystem(body: {
        codeComponent: string,
        codeSystem: string
    }): Promise<AxiosResponse<any[]>> {
        return api.post('/component/system', body);
    }
}

