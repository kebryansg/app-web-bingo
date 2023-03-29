import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, pluck} from "rxjs";
import {map} from "rxjs/operators";
import {LocalStorageService} from "./local-storage.service";
import {SelectionModel} from "@angular/cdk/collections";

const STORAGE_LETJUG: string = 'letJug'
const letras: LetraBingo[] = ["T"
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


  private lettersPlayed = new SelectionModel<LetraBingo>(true)

  private sbjAvailableLetters: BehaviorSubject<LetraBingo[]> = new BehaviorSubject<LetraBingo[]>([...letras])

  constructor(private storageService: LocalStorageService) {
  }

  getDataStore(): number[] {
    let letJug: number[] = this.storageService.get<number[]>(STORAGE_LETJUG)
    return letJug ?? []
  }

  setDataStorage() {
    this.storageService.set(STORAGE_LETJUG, this.lettersPlayed.selected)
  }

  get lettersPlayed$(): Observable<LetraBingo[]> {
    return this.lettersPlayed.changed.asObservable()
      .pipe(
        pluck('source', 'selected')
      )
  }

  get selectionModel(): SelectionModel<LetraBingo> {
    return this.lettersPlayed
  }

  setLetterPlayed(letra: LetraBingo) {
    this.lettersPlayed.toggle(letra)
    this.setDataStorage()
  }

  get lettersAll$(): Observable<LetraBingo[]> {
    return of([...letras])
  }

  get availableLetters$(): Observable<LetraBingo[]> {
    return this.sbjAvailableLetters.asObservable()
      .pipe(
        map(letters =>
          letters.filter(letter => !this.lettersPlayed.isSelected(letter))
        )
      )
  }

}


export type LetraBingo = "T"
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
