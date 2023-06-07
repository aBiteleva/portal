import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutesEnum} from "./app-routes.enum";
import {EmptyRouteComponent} from "./empty-route/empty-route.component";

const routes: Routes = [
    {
        loadChildren: () => import('./active-rule/active-rule.module').then((m) => m.ActiveRuleModule),
        path: AppRoutesEnum.ACTIVE_RULE_SCRIPT
    },
    {
        path: '**',
        component: EmptyRouteComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
