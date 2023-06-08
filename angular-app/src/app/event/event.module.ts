import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {EventRoutingModule} from "./event-routing.module";
import {CodemirrorModule} from "@ctrl/ngx-codemirror";
import {EventService} from "./event.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EventRoutingModule,
        CodemirrorModule,

        DialogModule
    ],
    declarations: [],
    providers: [EventService],
    exports: []
})
export class EventModule {
}
