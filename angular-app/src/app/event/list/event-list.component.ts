import {Component, OnInit} from '@angular/core';
import {EventPageItem} from '../event';
import {EventService} from "../event.service";

@Component({
    selector: 'app-active-rule-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['event-list.component.scss']
})
export class EventListComponent implements OnInit {
    events: EventPageItem[] = []

    constructor(private eventService: EventService) {
    }

    ngOnInit(): void {
        this.getRules();
    }

    getRules() {
        this.eventService.getEvents().subscribe(events => {
            this.events = events;
        })
    }
}

