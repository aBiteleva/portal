import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {EventPageItem} from './event';
import {Observable} from "rxjs";
import {CodeItem} from "../common/interface/code-item";

@Injectable({providedIn: "root"})
export class ComponentService {
    constructor(private httpClient: HttpClient) {
    }

    getComponents(): Observable<ComponentItem[]> {
        return this.httpClient.get<ComponentItem[]>(`${environment.API_ROOT_PATH}/component`);
    }
}

export interface ComponentItem extends CodeItem {
    description: string;
    lvl: null;
    system: object;
    role: object[];
    event: EventPageItem[];
}
