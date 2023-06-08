import {Component, Input} from "@angular/core";

@Component({
    templateUrl: 'button.component.html',
    selector: 'app-button',
    styleUrls: ['button.component.scss']
})
export class ButtonComponent {
    @Input() label: string = '';
    @Input() btnStyle: string = '';
    @Input() iconSize: string = '20';
    @Input() icon: string = '#000000';
}
