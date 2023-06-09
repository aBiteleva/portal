import {AxiosResponse} from 'axios';
import api from '../htttp';
import {ComponentInterface} from '../../store/types/componentTypes';

export class ComponentService {
    static async fetchComponent(): Promise<AxiosResponse<ComponentInterface[]>> {
        return api.get<ComponentInterface[]>('/component');
    }
}

