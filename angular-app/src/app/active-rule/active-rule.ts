import {EventListItem} from '../event/event';

export class ActiveRule {
    code: string | undefined;
    description: string | undefined;
    condition: string | undefined;
    action: string | undefined;
    event?: EventListItem[]
}

export class ActiveRuleCreateItem {
    description: string | undefined;
    condition: string | undefined;
    action: string | undefined;
}

export interface ActiveRuleUpdateItem extends ActiveRule {}

export class ActiveRuleEvent {
    codeRule: string | undefined;
    codeEvent: string | undefined;
    typeBind!: ActiveRuleEventTypeBind;
}

export enum ActiveRuleEventTypeBind {
    EVENT_TO_RULE = 'Event to Rule'
}
