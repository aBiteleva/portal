import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AppRoutesEnum} from "../app-routes.enum";
import {ConfirmationService} from "primeng/api";

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['../../styles.scss', 'event.component.scss'],
    providers: [ConfirmationService]
})
export class EventComponent {
    isDialogVisible: boolean = true;
    isEditorMode = false;

    constructor(private confirmationService: ConfirmationService, private route: Router) {
    }

    onAttach() {
        const currentRouteParts = this.route.url.split('/');

        this.isEditorMode = currentRouteParts[2] === AppRoutesEnum.CREATE || currentRouteParts[2] === AppRoutesEnum.EDIT;
    }

    backToOtherPerformance() {
        if (this.isEditorMode) {
            this.confirmationService.confirm({
                message: 'Вы уверены, что хотите выйти из редактора? Внесенные изменения могут быть утеряны.',
                header: 'Переход к другим представлениям',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Да',
                rejectLabel: 'Нет',
                accept: () => {
                    this.route.navigate([`/${AppRoutesEnum.EDITOR_ACTIVE_RULES}`]);
                }
            });
        } else {
            this.route.navigate([`/${AppRoutesEnum.EDITOR_ACTIVE_RULES}`]);
        }
    }

    getDialogHeight(): string {
        return `${window.innerHeight - 200}px`;
    }
}
