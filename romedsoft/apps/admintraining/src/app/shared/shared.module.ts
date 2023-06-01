import {NgModule} from "@angular/core";
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';

const UX_MODULES = [
    CardModule,ToolbarModule,ButtonModule,SplitButtonModule,TableModule
]


@NgModule({
    declarations: [ ],
    imports : UX_MODULES,
    exports: UX_MODULES
})
export class SharedModule {}