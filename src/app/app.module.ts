import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from "./page/register/register.component";
import {PlayComponent} from "./page/play/play.component";
import {
  DxButtonModule,
  DxDataGridModule,
  DxListModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextBoxModule, DxValidatorModule
} from "devextreme-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TabsControlComponent} from './page/tabs-control/tabs-control.component';
import {NumbersPlayedComponent} from './page/numbers-played/numbers-played.component';
import {TablaComponent} from "./components/tabla/tabla.component";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PlayComponent,
    TablaComponent,
    TabsControlComponent,
    NumbersPlayedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DxDataGridModule,
    DxListModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
