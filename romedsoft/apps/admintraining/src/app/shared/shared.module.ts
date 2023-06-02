import {NgModule} from "@angular/core";
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";


const UX_MODULES = [
    CardModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    TableModule, 
    InputTextModule,
    ToastModule
]


@NgModule({
    declarations: [ ],
    imports : UX_MODULES,
    exports: UX_MODULES
})
export class SharedModule {}