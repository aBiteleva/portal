import {Component, OnInit} from '@angular/core';
import {ActiveRule} from "../active-rule";
import {ActiveRuleService} from "../active-rule.service";
import {Event} from '../../event/event';

@Component({
    selector: 'app-active-rule-list',
    templateUrl: './active-rule-list.component.html',
    styleUrls: ['active-rule-list.component.scss']
})
export class ActiveRuleListComponent implements OnInit {
    activeRules: ActiveRule[] = []

    constructor(private activeRuleService: ActiveRuleService) {
    }

    ngOnInit(): void {
        this.getRules();
    }

    getRules() {
        this.activeRuleService.getRules().subscribe(rules => {
            this.activeRules = rules;
        })
    }

    formatEventListToString(events: Event[] | undefined): string {
        return <string>events?.map(ev => ev.code).join(', ');
    }
}

