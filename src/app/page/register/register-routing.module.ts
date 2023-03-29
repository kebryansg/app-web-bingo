import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./register.component";
import {TablaResolver} from "../../resolvers/tabla.resolver";

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  },
  {
    path: ':codigo',
    component: RegisterComponent,
    resolve: {
      tabla: TablaResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {
}
