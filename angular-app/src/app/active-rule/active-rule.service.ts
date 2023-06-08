import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ActiveRule, ActiveRuleCreateItem, ActiveRuleEvent, ActiveRuleUpdateItem} from "./active-rule";
import {Observable} from "rxjs";

@Injectable()
export class ActiveRuleService {
    constructor(private httpClient: HttpClient) {
    }

    getRules(): Observable<ActiveRule[]> {
        return this.httpClient.get<ActiveRule[]>(`${environment.API_ROOT_PATH}/active-rule`)
    }

    getRuleByCode(code: string): Observable<ActiveRule> {
        return this.httpClient.get<ActiveRule>(`${environment.API_ROOT_PATH}/active-rule/${code}`)
    }

    createRule(activeRuleCreateItem: ActiveRuleCreateItem): Observable<ActiveRule> {
        return this.httpClient.post<ActiveRule>(`${environment.API_ROOT_PATH}/active-rule`, activeRuleCreateItem)
    }

    updateRule(activeRuleUpdateItem: ActiveRuleUpdateItem): Observable<ActiveRule> {
        return this.httpClient.patch<ActiveRule>(`${environment.API_ROOT_PATH}/active-rule`, activeRuleUpdateItem)
    }

    addEventsToRule(activeRuleEvent: ActiveRuleEvent) {
        return this.httpClient.post(`${environment.API_ROOT_PATH}/active-rule/event`, activeRuleEvent)
    }

    deleteEventsToRule(activeRuleEvent: ActiveRuleEvent) {
        return this.httpClient.delete(`${environment.API_ROOT_PATH}/active-rule/event`, {body: activeRuleEvent})
    }
}
