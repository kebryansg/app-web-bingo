import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, pluck} from "rxjs";
import {map} from "rxjs/operators";
import {LocalStorageService} from "./local-storage.service";
import {SelectionModel} from "@angular/cdk/collections";

const STORAGE_LETJUG: string = 'letJug'
const LETRAS: LetraBingo[] = ["T"
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

  private sbjAvailableLetters: BehaviorSubject<LetraBingo[]> = new BehaviorSubject<LetraBingo[]>([...LETRAS])

  constructor(private storageService: LocalStorageService) {
  }

  loadDataStore(): void {
    this.lettersPlayed.select(...this.getDataStore())
  }

  getDataStore(): LetraBingo[] {
    let letJug: LetraBingo[] = this.storageService.get<LetraBingo[]>(STORAGE_LETJUG)
    return letJug ?? []
  }

  setDataStorage() {
    this.storageService.set(STORAGE_LETJUG, this.lettersPlayed.selected)
  }

  setLetterPlayed(letra: LetraBingo) {
    this.lettersPlayed.toggle(letra)
    this.sbjAvailableLetters.next([...LETRAS])
    this.setDataStorage()
  }

  get selectionModel(): SelectionModel<LetraBingo> {
    return this.lettersPlayed
  }

  get lettersAll$(): Observable<LetraBingo[]> {
    return of([...LETRAS])
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
