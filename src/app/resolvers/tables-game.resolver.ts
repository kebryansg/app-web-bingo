import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {TablaService} from "../services/tabla.service";

@Injectable({
  providedIn: 'root'
})
export class TablesGameResolver implements Resolve<any> {

  constructor(private tablaService: TablaService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.tablaService.loadData()
    return of(this.tablaService.getTables());
  }
}
