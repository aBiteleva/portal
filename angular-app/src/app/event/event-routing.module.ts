import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppRoutesEnum} from "../app-routes.enum";
import {EventComponent} from "./event.component";
import {EventListComponent} from "./list/event-list.component";
import {EventEditorComponent} from "./editor/event-editor.component";

const routes: Routes = [{
    path: '',
    component: EventComponent,
    children: [
        {
            path: '',
            component: EventListComponent
        },
        {
            path: AppRoutesEnum.CREATE,
            component: EventEditorComponent
        },
        {
            path: `${AppRoutesEnum.EDIT}/:id`,
            component: EventEditorComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventRoutingModule {
}
