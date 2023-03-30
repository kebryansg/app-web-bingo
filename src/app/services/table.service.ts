import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CreateDtoTable, CrudTable, TableResponse, TableView} from "../interfaces/table.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  apiUrl = environment.apiUrl

  httpClient = inject(HttpClient)

  all$ = this.httpClient.get<TableView[]>(`${this.apiUrl}/table`)

  getTableById(idTable: number): Observable<TableView> {
    return this.httpClient.get<TableView>(`${this.apiUrl}/table/${idTable}`)
  }

  createTable(payload: CreateDtoTable): Observable<TableResponse> {
    return this.httpClient.post<TableResponse>(`${this.apiUrl}/table`, payload)
  }

  updateTable(idTable: number, payload: CreateDtoTable): Observable<CrudTable> {
    return this.httpClient.patch<CrudTable>(`${this.apiUrl}/table/${idTable}`, payload)
  }

  deleteTable(idTable: number): Observable<CrudTable> {
    return this.httpClient.delete<CrudTable>(`${this.apiUrl}/table/${idTable}`)
  }

}


