import {AxiosResponse} from 'axios';
import api from '../htttp';
import {AddEventInterface, DeleteEventInterface, EventsInterface} from '../../store/types/eventsTypes';

export class EventsService {
    static async fetchEventsBySystemCode(code: string = '00016'): Promise<AxiosResponse<EventsInterface[]>> {
        return api.get<EventsInterface[]>(`/event/system/${code}`);
    }

    static async addEvent(body: AddEventInterface): Promise<AxiosResponse<any[]>> {
        return api.post<any[]>('/event/atomic', body);
    }

    static async deleteEvent(data: DeleteEventInterface): Promise<AxiosResponse<any[]>> {
        return api.delete<any[]>('/event/atomic', {data});
    }
}

