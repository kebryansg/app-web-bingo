import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {LETTER_POSITION} from '../../const/letters-position.const';
import {LetraBingo, LetraPlayService} from "../../services/letra-play.service";
import {PlayService} from "../../services/play.service";
import {combineLatest} from "rxjs";
import {ItemNumber} from "../../interfaces/table.interface";
import {map} from "rxjs/operators";
import {getIntersection} from "../../utils/array.util";

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablaComponent {

  @Input() nums: ItemNumber[] = []
  @Input() codTabla!: string

  @Output() onEdit: EventEmitter<string> = new EventEmitter<string>()
  @Output() onDelete: EventEmitter<string> = new EventEmitter<string>()


  playService: PlayService = inject(PlayService)
  letraPlayService: LetraPlayService = inject(LetraPlayService)

  get lettersPlayed$() {
    return combineLatest([
      this.playService.numJugads$,
      this.letraPlayService.availableLetters$
    ], (numberOut, lettersPlayed) => lettersPlayed)
      .pipe(
        map((lettersPlayed) => lettersPlayed.filter(letter => this.compareLetra(letter))),
      )
  }

  get codeTable() {
    return `${this.codTabla.split('_')[1]}`
  }

  compareLetra(letra: LetraBingo): boolean {

    const positionsTable = this.nums.filter(item => item.isSelected)
      .map(item => item.position);

    return getIntersection(LETTER_POSITION[letra], positionsTable).length === LETTER_POSITION[letra].length
  }

  trackByNumber(item: number) {
    return item
  }

}


