import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {TablaService} from "../services/tabla.service";
import {Table} from "../interfaces/table.interface";

@Injectable({providedIn: 'root'})
export class TablaResolver implements Resolve<Table> {
  constructor(private tablaService: TablaService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Table> {

    const codTabla = route.paramMap.get('codigo')
    if (!codTabla) return throwError({})

    this.tablaService.loadData()
    const table = this.tablaService.getTableByKey(codTabla) ?? undefined

    if (!table) return throwError({})

    const {tipoTabla, data} = table
    return of({
      codTabla: codTabla ?? '',
      data,
      tipoTabla,
    })
  }
}
