import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ActiveRuleComponent} from "./active-rule.component";
import {AppButtonModule} from "../common/component/button/app-button.module";
import {CardModule} from "primeng/card";
import {ActiveRuleRoutingModule} from "./active-rule-routing.module";
import {ActiveRuleListComponent} from "./list/active-rule-list.component";
import {ActiveRuleEditorComponent} from "./editor/active-rule-editor.component";
import {TabViewModule} from "primeng/tabview";
import {CodemirrorModule} from "@ctrl/ngx-codemirror";
import {ActiveRuleService} from "./active-rule.service";
import {ButtonModule} from "primeng/button";
import {MessageModule} from "primeng/message";
import {EventModule} from "../event/event.module";
import {MultiSelectModule} from "primeng/multiselect";
import {InputTextModule} from "primeng/inputtext";
import {ConstructorComponent} from "./editor/constructor/constructor.component";
import {FreeWriteComponent} from "./editor/free-write/free-write.component";
import {TooltipModule} from "primeng/tooltip";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ActiveRuleRoutingModule,
        CodemirrorModule,
        EventModule,

        DialogModule,
        ButtonModule,
        CardModule,
        TabViewModule,
        ButtonModule,
        AppButtonModule,
        MessageModule,
        MultiSelectModule,
        InputTextModule,
        TooltipModule,
        ConfirmDialogModule
    ],
    declarations: [ActiveRuleComponent, ActiveRuleListComponent, ActiveRuleEditorComponent, ConstructorComponent, FreeWriteComponent],
    providers: [ActiveRuleService],
    exports: []
})
export class ActiveRuleModule {
}
