import {AxiosResponse} from 'axios';
import api from '../htttp';
import {EventsInterface} from '../../store/types/eventsTypes';

export class EventsService {
    static async fetchEventsBySystemCode(code: string = '00016'): Promise<AxiosResponse<EventsInterface[]>> {
        return api.get<EventsInterface[]>(`/event/system/${code}`);
    }
}

