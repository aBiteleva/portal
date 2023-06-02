import {Component} from '@angular/core';
import {ActiveRule} from "../active-rule";

@Component({
    selector: 'app-active-rule-list',
    templateUrl: './active-rule-list.component.html',
    styleUrls: ['active-rule-list.component.scss']
})
export class ActiveRuleListComponent {
    activeRules: ActiveRule[] = [
        {
            code: 'AR-1',
            description: 'TEST',
            action: 'TEST',
            condition: 'TEST'
        },
        {
            code: 'AR-2',
            description: 'TEST',
            action: 'TEST',
            condition: 'TEST'
        },
        {
            code: 'AR-3',
            description: 'TEST',
            action: 'TEST',
            condition: 'TEST'
        },
        {
            code: 'AR-4',
            description: 'TEST',
            action: 'TEST',
            condition: 'TEST'
        },
        {
            code: 'AR-5',
            description: 'TEST',
            action: 'TEST',
            condition: 'TEST'
        },
    ]
}
