import {Injectable} from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {map, startWith, switchMap} from "rxjs/operators";
import {LocalStorageService} from "./local-storage.service";

const STORAGE_LETJUG = 'letJug'
const letras: letraBingo[] = ["T"
  , "L"
  , "C"
  , "A"
  , "F"
  , "E"
  , "D"
  , "I"
  , "O"
  , "U"
  , "H"
  , "P"]

@Injectable({
  providedIn: 'root'
})
export class LetraPlayService {

  private letraOut: letraBingo[] = []
  private sbjLetterOut$: Subject<letraBingo[]> = new Subject()

  constructor(private storageService: LocalStorageService) {
  }

  getDataStore(): number[] {
    let letJug: number[] = this.storageService.get<number[]>(STORAGE_LETJUG)
    return letJug ?? []
  }

  setDataStorage() {
    this.storageService.set(STORAGE_LETJUG, this.letraOut)
    console.log('Save Letter Out', JSON.stringify(this.letraOut))
  }

  setLetraPlay(letra: letraBingo) {
    this.letraOut = [...this.letraOut, letra]
    this.setDataStorage()
    // this.sbjLetterOut$.next()
  }

  get letras(): letraBingo[] {
    if (this.letraOut.length <= 0)
      return [...letras]

    return letras.filter(this._filter)
  }

  get obsLetras$(): Observable<letraBingo[]> {

    return this.sbjLetterOut$
      .pipe(
        startWith(letras),
        switchMap(() => of(letras)),
        map(l1 => l1.filter(this._filter))
      )

    /*return of(letras)
      .pipe(
        map(l1 => l1.filter(item => !this.getDataStore().some(l2 => item == l2)))
      )*/
  }

  _filter = (item: any) => !this.getDataStore().some(l2 => item == l2)

}


export type letraBingo = "T"
  | "L"
  | "C"
  | "A"
  | "F"
  | "E"
  | "D"
  | "I"
  | "O"
  | "U"
  | "H"
  | "P"
