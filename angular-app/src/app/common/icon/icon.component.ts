import {Component, Input} from "@angular/core";

@Component({
    templateUrl: 'icon.component.html',
    selector: 'app-icon'
})
export class IconComponent {
    @Input() name: string = '';
    @Input() size: string = '';
    @Input() color: string = '#000000';
    link = `/icons.svg#${this.name}`
}
