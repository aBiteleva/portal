import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Event} from './event';
import {Observable} from "rxjs";

@Injectable()
export class EventService {
    constructor(private httpClient: HttpClient) {
    }

    getEvents(): Observable<Event[]> {
        return this.httpClient.get<Event[]>(`${environment.API_ROOT_PATH}/event`);
    }
}
