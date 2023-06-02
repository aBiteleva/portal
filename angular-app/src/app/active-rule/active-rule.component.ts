import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AppRoutesEnum} from "../app-routes.enum";

@Component({
    selector: 'app-active-rule',
    templateUrl: './active-rule.component.html',
    styleUrls: ['../../styles.scss', 'active-rule.component.scss']
})
export class ActiveRuleComponent {
    isDialogVisible: boolean = true;
    isEditorMode = false;

    constructor(private route: Router) {
    }

    onAttach() {
        const currentRouteParts = this.route.url.split('/');

        this.isEditorMode = currentRouteParts[2] === AppRoutesEnum.CREATE || currentRouteParts[2] === AppRoutesEnum.EDIT;
    }
}
