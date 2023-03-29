import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from "./register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DxButtonModule, DxDataGridModule, DxSelectBoxModule, DxTextBoxModule} from "devextreme-angular";


@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxButtonModule
  ]
})
export class RegisterModule {
}
