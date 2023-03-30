import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PlayComponent} from "./page/play/play.component";
import {TabsControlComponent} from './page/tabs-control/tabs-control.component';
import {NumbersPlayedComponent} from './page/numbers-played/numbers-played.component';
import {TablaComponent} from "./components/tabla/tabla.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    TablaComponent,
    TabsControlComponent,
    NumbersPlayedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
