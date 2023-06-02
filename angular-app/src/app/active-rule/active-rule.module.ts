import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ActiveRuleComponent} from "./active-rule.component";
import {ButtonModule} from "../common/button/button.module";
import {CardModule} from "primeng/card";
import {ActiveRuleRoutingModule} from "./active-rule-routing.module";
import {ActiveRuleListComponent} from "./list/active-rule-list.component";
import {ActiveRuleEditorComponent} from "./editor/active-rule-editor.component";
import {TabViewModule} from "primeng/tabview";
import {CodemirrorModule} from "@ctrl/ngx-codemirror";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ActiveRuleRoutingModule,
        CodemirrorModule,

        DialogModule,
        ButtonModule,
        CardModule,
        TabViewModule
    ],
    declarations: [ActiveRuleComponent, ActiveRuleListComponent, ActiveRuleEditorComponent],
    exports: []
})
export class ActiveRuleModule {
}
