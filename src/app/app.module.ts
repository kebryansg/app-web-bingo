import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from "./page/register/register.component";
import {PlayComponent} from "./page/play/play.component";
import {DxDataGridModule, DxListModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule} from "devextreme-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TablaComponent} from "./components/tabla/tabla.component";
import { TabsControlComponent } from './page/tabs-control/tabs-control.component';
import { NumbersPlayedComponent } from './page/numbers-played/numbers-played.component';

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
    DxTextBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
