import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LETTER_POSITION} from '../../const/letters-position.const';
import {letraBingo, LetraPlayService} from "../../services/letra-play.service";
import {PlayService} from "../../services/play.service";
import {SelectionModel} from "@angular/cdk/collections";
import {Subject, takeUntil} from "rxjs";
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

  constructor(public playService: PlayService,
              private tablaService: TablaService,
              private letraPlayService: LetraPlayService,) {
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  ngOnInit(): void {
    this.playService.numJugads$
      .subscribe({
        next: () => this.comprobarTabla()
      })
  }

  async deleteTabla() {
    this.tablaService.deleteTable(this.codTabla)
  }

  comprobarTabla() {
    for (let letra of this.letraPlayService.letras) {
      const isValid = this.comprobarLetra(letra)
      if (isValid) {
        this.letra = letra
        break
      }
    }
  }

  comprobarLetra(letra: letraBingo): boolean {
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

  trackByNumber(item:number){
    return item
  }

}


