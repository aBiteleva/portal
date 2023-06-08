import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {EventRoutingModule} from "./event-routing.module";
import {CodemirrorModule} from "@ctrl/ngx-codemirror";
import {EventService} from "./event.service";
import {EventComponent} from "./event.component";
import {EventListComponent} from "./list/event-list.component";
import {EventEditorComponent} from "./editor/event-editor.component";
import {AppButtonModule} from "../common/component/button/app-button.module";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {TabViewModule} from "primeng/tabview";
import {MessageModule} from "primeng/message";
import {MultiSelectModule} from "primeng/multiselect";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EventRoutingModule,
        CodemirrorModule,

        DialogModule,
        ButtonModule,
        CardModule,
        TabViewModule,
        ButtonModule,
        AppButtonModule,
        MessageModule,
        MultiSelectModule,
        InputTextModule
    ],
    declarations: [EventComponent, EventListComponent, EventEditorComponent],
    providers: [EventService],
    exports: []
})
export class EventModule {
}
