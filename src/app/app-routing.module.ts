import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayComponent} from "./page/play/play.component";
import {TablesGameResolver} from "./resolvers/tables-game.resolver";
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
        path:'register',
        loadChildren: () => import('./page/register/register.module').then(module=> module.RegisterModule)
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
