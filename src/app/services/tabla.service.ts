import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {Table, TableStorage} from "../interfaces/table.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

const STORAGE_KEY: string = 'TABLA_KEY'

@Injectable({
  providedIn: 'root'
})
export class TablaService {

  tables: Map<string, TableStorage> = new Map<string, TableStorage>()

  private sbjAvailableTables: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private storageService: LocalStorageService,) {
  }

  get availableTables$(): Observable<Table[]> {
    return this.sbjAvailableTables.asObservable()
      .pipe(
        map(() => this.getTables()),
      )
  }

  setTable(key: string, content: TableStorage) {
    this.tables.set(key, content)
    this.storageService.set(STORAGE_KEY, [...this.tables.keys()])
    this.storageService.set(key, content)
  }

  deleteTable(key: string) {
    this.tables.delete(key)
    this.sbjAvailableTables.next(true)
  }

  loadData() {
    this.tableStorage
      .forEach(key => {
        this.tables.set(key, this.storageService.get(key))
      })
    this.sbjAvailableTables.next(true)
  }

  get tableStorage() {
    return this.storageService.get<string[]>(STORAGE_KEY) ?? []
  }

  getTableByKey(key: string) {
    return this.tables.get(key)
  }

  getTables(): Table[] {
    return [...this.tables.entries()]
      .map(([key, {tipoTabla, data}]) =>
        ({
          codTabla: key,
          tipoTabla,
          data: mapItems(data)
        })
      )
  }

}

const mapItems = (items: any[]): number[] => items.map((item: any) => {
  return [item['a'], item['b'], item['c'], item['d'], item['e'],]
}).flat()
