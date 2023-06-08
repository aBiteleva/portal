import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AppRoutesEnum} from "../app-routes.enum";

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['../../styles.scss', 'event.component.scss']
})
export class EventComponent {
    isDialogVisible: boolean = true;
    isEditorMode = false;

    constructor(private route: Router) {
    }

    onAttach() {
        const currentRouteParts = this.route.url.split('/');

        this.isEditorMode = currentRouteParts[2] === AppRoutesEnum.CREATE || currentRouteParts[2] === AppRoutesEnum.EDIT;
    }
}
