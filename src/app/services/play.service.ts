import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {SelectionModel} from "@angular/cdk/collections";

const STORAGE_NUMJUG: string = 'numJug'

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  numbersPlayed = new SelectionModel<number>(true)
  private sbjNumJugados$: BehaviorSubject<number[]>

  constructor(private storageService: LocalStorageService) {
    this.sbjNumJugados$ = new BehaviorSubject<number[]>([])
  }

  getDataStore() {
    let numJug: number[] = this.storageService.get<number[]>(STORAGE_NUMJUG)
    return (numJug ?? []).map(item => +item)
  }

  loadData() {
    this.numbersPlayed.select(...this.getDataStore())
    this.sbjNumJugados$.next(this.getDataStore())
  }

  setDataStorage() {
    this.storageService.set(STORAGE_NUMJUG, this.numbersPlayed.selected)
  }

  get numJugads$(): Observable<number[]> {
    return this.sbjNumJugados$.asObservable()
  }

  get selectionModel(): SelectionModel<number> {
    return this.numbersPlayed
  }

  setNumberPlay(numero: number) {
    this.numbersPlayed.toggle(numero)

    this.setDataStorage()
    this.sbjNumJugados$.next([...this.numbersPlayed.selected])
  }
}
