import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {TableView} from "../interfaces/table.interface";
import {TableService} from "../services/table.service";

@Injectable({providedIn: 'root'})
export class TablaResolver  {
  constructor(private tableService: TableService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TableView> {

    const codTabla = route.paramMap.get('codigo')
    if (!codTabla) return throwError({})

    return this.tableService.getTableById(+codTabla)
  }
}
