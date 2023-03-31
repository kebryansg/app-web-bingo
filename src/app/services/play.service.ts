import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {SelectionModel} from "@angular/cdk/collections";
import {map} from "rxjs/operators";

const STORAGE_NUMJUG: string = 'numJug'

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  numbersAll$ = of(generateNumbers())

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

  get countNumberPlayed$(): Observable<number> {
    return this.sbjNumJugados$.asObservable()
      .pipe(
        map(numbersPlayed => numbersPlayed.length)
      )
  }

  setNumberPlay(numero: number) {
    this.numbersPlayed.toggle(numero)

    this.setDataStorage()
    this.sbjNumJugados$.next([...this.numbersPlayed.selected])
  }

  clearNumbersPlayed(){
    this.numbersPlayed.clear()
    this.sbjNumJugados$.next([])
  }
}


const generateNumbers = () => {
  return Array.from({length: 75})
    .map((_value, idx) => (idx + 1))
}
