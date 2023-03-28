import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {LocalStorageService} from "./local-storage.service";
import {SelectionModel} from "@angular/cdk/collections";

const STORAGE_NUMJUG = 'numJug'

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

  loadData(){
    this.numbersPlayed.select(...this.getDataStore())
  }

  setDataStorage() {
    this.storageService.set(STORAGE_NUMJUG, this.numbersPlayed.selected)
  }

  get numJugads$(): Observable<number[]> {
    return this.numbersPlayed.changed.asObservable()
      .pipe(
        map(data => data.source.selected)
      )

    // return this.sbjNumJugados$
    //   .pipe(
    //     map(() => this.getDataStore()),
    //     // tap(console.log),
    //     tap(ls => this.numJugados = ls),
    //   )
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
