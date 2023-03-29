import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./page/register/register.component";
import {PlayComponent} from "./page/play/play.component";
import {TablesGameResolver} from "./resolvers/tables-game.resolver";
import {TablaResolver} from "./resolvers/tabla.resolver";
import {TabsControlComponent} from "./page/tabs-control/tabs-control.component";
import {NumbersPlayedComponent} from "./page/numbers-played/numbers-played.component";

const routes: Routes = [
  {
    path: '',
    component: TabsControlComponent,
    resolve: {
      tables: TablesGameResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'numbers-played',
        pathMatch: 'full'
      },
      {
        path: 'numbers-played',
        component: NumbersPlayedComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'register/:codigo',
        component: RegisterComponent,
        resolve: {
          tabla: TablaResolver
        }
      },
      {
        path: 'play',
        component: PlayComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
