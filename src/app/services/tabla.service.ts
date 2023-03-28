import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {Table, TableStorage} from "../interfaces/table.interface";

const STORAGE_KEY = 'TABLA_KEY'

@Injectable({
  providedIn: 'root'
})
export class TablaService {

  tables = new Map<string, TableStorage>()

  constructor(private storageService: LocalStorageService,) {
  }

  setTable(key: string, content: TableStorage) {
    this.tables.set(key, content)
    this.storageService.set(STORAGE_KEY, [...this.tables.keys()])
    this.storageService.set(key, content)
  }

  deleteTable(key: string) {
    this.tables.delete(key)
  }

  loadData() {
    this.tableStorage
      .forEach(key => {
        this.tables.set(key, this.storageService.get(key))
      })
  }

  get tableStorage() {
    return this.storageService.get<string[]>(STORAGE_KEY) ?? []
  }

  getTableByKey(key: string) {
    return this.tables.get(key)
  }

  getTables(): Table[] {
    return [...this.tables.entries()]
      .map(([key, value]) =>
        ({
          codTabla: key,
          ...value
        })
      )
  }

}
