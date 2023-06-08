import {Component, Input} from "@angular/core";
import {ActiveRule} from "../../active-rule";
import {Event} from "../../../event/event";

@Component({
    templateUrl: 'constructor.component.html',
    selector: 'app-constructor-editor'
})
export class ConstructorComponent {
    @Input() activeRule: ActiveRule = new ActiveRule();
    @Input() eventList: Event[] = [];
    selectedEvents: Event[] | undefined = [];
    @Input() initialEventsList: Event[] | undefined = [];

}
