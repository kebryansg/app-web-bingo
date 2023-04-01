import {Routes} from "@angular/router";
import {TabsControlComponent} from "./page/tabs-control/tabs-control.component";
import {TablesGameResolver} from "./resolvers/tables-game.resolver";
import {PlayComponent} from "./page/play/play.component";

export const routes: Routes = [
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
        loadComponent: () => import('./page/numbers-played/numbers-played.component')
      },
      {
        path: 'register',
        loadChildren: () => import('./page/register/register.module').then(module => module.RegisterModule)
      },
      {
        path: 'play',
        component: PlayComponent,
      }
    ]
  },

];
