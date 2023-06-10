import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ContextParam} from './event';
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class ContextParamService {
    constructor(private httpClient: HttpClient) {
    }

    getParams(): Observable<ContextParam[]> {
        return this.httpClient.get<ContextParam[]>(`${environment.API_ROOT_PATH}/context-param`);
    }
}
