import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {TablaService} from "../services/tabla.service";
import {PlayService} from "../services/play.service";

@Injectable({
  providedIn: 'root'
})
export class TablesGameResolver implements Resolve<any> {

  tablaService: TablaService = inject(TablaService)
  playService: PlayService = inject(PlayService)

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.tablaService.loadData()
    this.playService.loadData()
    return of(this.tablaService.getTables());
  }
}
