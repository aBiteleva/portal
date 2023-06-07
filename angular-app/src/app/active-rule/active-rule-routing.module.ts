import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ActiveRuleComponent} from "./active-rule.component";
import {ActiveRuleListComponent} from "./list/active-rule-list.component";
import {ActiveRuleEditorComponent} from "./editor/active-rule-editor.component";
import {AppRoutesEnum} from "../app-routes.enum";

const routes: Routes = [
    {
        path: '',
        component: ActiveRuleComponent,
        children: [
            {
                path: '',
                component: ActiveRuleListComponent
            },
            {
                path: AppRoutesEnum.CREATE,
                component: ActiveRuleEditorComponent
            },
            {
                path: `${AppRoutesEnum.EDIT}/:id`,
                component: ActiveRuleEditorComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActiveRuleRoutingModule {
}
