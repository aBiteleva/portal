import {Component, Input} from "@angular/core";
import {ActiveRule} from "../../active-rule";
import {EventListItem} from "../../../event/event";

@Component({
    templateUrl: 'constructor.component.html',
    selector: 'app-constructor-editor'
})
export class ConstructorComponent {
    @Input() activeRule: ActiveRule = new ActiveRule();
    @Input() eventList: EventListItem[] = [];
    selectedEvents: EventListItem[] | undefined = [];
    @Input() initialEventsList: EventListItem[] | undefined = [];

}
