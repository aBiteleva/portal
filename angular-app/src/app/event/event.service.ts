import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {
    AggregationAtomicEvent,
    AggregationEventCreateItem,
    AggregationEventUpdateItem, AtomicEventComponent,
    AtomicEventCreateItem,
    AtomicEventUpdateItem, ComplexEventCreateItem,
    ComplexEventUpdateItem,
    EventPageItem, InboundComplexEvent
} from './event';
import {Observable} from "rxjs";

@Injectable()
export class EventService {
    constructor(private httpClient: HttpClient) {
    }

    getEvents(): Observable<EventPageItem[]> {
        return this.httpClient.get<EventPageItem[]>(`${environment.API_ROOT_PATH}/event`);
    }

    getEventByCode(code: string): Observable<EventPageItem> {
        return this.httpClient.get<EventPageItem>(`${environment.API_ROOT_PATH}/event/${code}`);
    }



    createAtomicEvent(event: AtomicEventCreateItem): Observable<AtomicEventUpdateItem> {
        return this.httpClient.post<AtomicEventUpdateItem>(`${environment.API_ROOT_PATH}/event/atomic`, event);
    }

    updateAtomicEvent(event: AtomicEventUpdateItem): Observable<AtomicEventUpdateItem> {
        return this.httpClient.patch<AtomicEventUpdateItem>(`${environment.API_ROOT_PATH}/event/atomic`, event);
    }

    bindAtomicEventToComponent(atomicEventComponent: AtomicEventComponent) {
        return this.httpClient.post(`${environment.API_ROOT_PATH}/event/atomic/component`, atomicEventComponent);
    }

    unbindAtomicEventToComponent(atomicEventComponent: AtomicEventComponent) {
        return this.httpClient.delete(`${environment.API_ROOT_PATH}/event/atomic/component`, {body: atomicEventComponent});
    }



    createAggregationEvent(event: AggregationEventCreateItem): Observable<AggregationEventUpdateItem> {
        return this.httpClient.post<AggregationEventUpdateItem>(`${environment.API_ROOT_PATH}/event/aggregation`, event);
    }

    updateAggregationEvent(event: AggregationEventUpdateItem): Observable<AggregationEventUpdateItem> {
        return this.httpClient.patch<AggregationEventUpdateItem>(`${environment.API_ROOT_PATH}/event/aggregation`, event);
    }

    bindAggregationEventToAtomic(aggregationAtomicEvent: AggregationAtomicEvent) {
        return this.httpClient.post(`${environment.API_ROOT_PATH}/event/aggregation/atomic`, aggregationAtomicEvent);
    }

    unbindAggregationEventToAtomic(aggregationAtomicEvent: AggregationAtomicEvent) {
        return this.httpClient.delete(`${environment.API_ROOT_PATH}/event/aggregation/atomic`, {body: aggregationAtomicEvent});
    }



    createComplexEvent(event: ComplexEventCreateItem): Observable<ComplexEventUpdateItem> {
        return this.httpClient.post<ComplexEventUpdateItem>(`${environment.API_ROOT_PATH}/event/complex`, event);
    }

    updateComplexEvent(event: ComplexEventUpdateItem): Observable<ComplexEventUpdateItem> {
        return this.httpClient.patch<ComplexEventUpdateItem>(`${environment.API_ROOT_PATH}/event/complex`, event);
    }

    bindEventToComplex(inboundComplexEvent: InboundComplexEvent) {
        return this.httpClient.post(`${environment.API_ROOT_PATH}/event/complex/inbound`, inboundComplexEvent);
    }

    unbindEventToComplex(inboundComplexEvent: InboundComplexEvent) {
        return this.httpClient.delete(`${environment.API_ROOT_PATH}/event/complex/inbound`, {body: inboundComplexEvent});
    }
}
