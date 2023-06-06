import {NgModule} from "@angular/core";
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';

const UX_MODULES = [
    CardModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    TableModule, 
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    TagModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
    InputMaskModule
]


@NgModule({
    declarations: [ ],
    imports : UX_MODULES,
    exports: UX_MODULES
})
export class SharedModule {}