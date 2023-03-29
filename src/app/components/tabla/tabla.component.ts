import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {LETTER_POSITION} from '../../const/letters-position.const';
import {LetraBingo, LetraPlayService} from "../../services/letra-play.service";
import {PlayService} from "../../services/play.service";
import {Subject, switchMap, tap} from "rxjs";
import {TablaService} from "../../services/tabla.service";

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit, OnDestroy {

  @Input() nums!: number[]
  @Input() codTabla!: string

  letra!: string;

  destroy$ = new Subject<boolean>()

  public playService: PlayService = inject(PlayService)
  tablaService: TablaService = inject(TablaService)
  letraPlayService: LetraPlayService = inject(LetraPlayService)

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  ngOnInit(): void {
    this.playService.numJugads$
      .pipe(
        switchMap(() => this.letraPlayService.availableLetters$),
        tap(console.log),
      )
      .subscribe({
        next: (letters) => this.comprobarTabla(letters)
      })
  }

  async deleteTabla() {
    this.tablaService.deleteTable(this.codTabla)
  }

  comprobarTabla(lettersPlayed: LetraBingo[]) {
    console.log(lettersPlayed)
    for (let letra of lettersPlayed) {
      const isValid = this.comprobarLetra(letra)
      if (isValid) {
        this.letra = letra
        break
      }
    }
  }

  comprobarLetra(letra: LetraBingo): boolean {
    const positions = {
      ...LETTER_POSITION
    }
    const position = this.nums.map((num, index) =>
      this.playService.numbersPlayed.isSelected(num) ? index : -1
    )
      .filter(num => num != -1)
      .sort()

    return position.length == positions[letra].length
      && positions[letra].sort().join(',') == position.join(',')
  }

  trackByNumber(item: number) {
    return item
  }

}


