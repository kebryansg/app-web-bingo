import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key) ?? 'null')
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value as any))
  }
}
