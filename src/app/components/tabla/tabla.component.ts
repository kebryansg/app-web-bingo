import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {LETTER_POSITION} from '../../const/letters-position.const';
import {LetraBingo, LetraPlayService} from "../../services/letra-play.service";
import {PlayService} from "../../services/play.service";
import {combineLatest, Observable} from "rxjs";
import {ItemNumber} from "../../interfaces/table.interface";
import {map} from "rxjs/operators";
import {getIntersection} from "../../utils/array.util";
import {AsyncPipe, NgFor} from "@angular/common";
import {LetterComponent} from "../letter/letter.component";
import {DxDropDownButtonModule} from "devextreme-angular";

@Component({
  standalone: true,
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  imports: [
    NgFor,
    AsyncPipe,
    DxDropDownButtonModule,
    LetterComponent
  ],
  styleUrls: ['./tabla.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaComponent {

  @Input() nums: ItemNumber[] = []
  @Input() codTabla!: string
  @Input() idTabla!: number

  @Output() onEdit: EventEmitter<number> = new EventEmitter<number>()
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>()


  playService: PlayService = inject(PlayService)
  letraPlayService: LetraPlayService = inject(LetraPlayService)
  downloads = [
    {value: 1, name: 'Editar', icon: 'edit'},
    {value: 2, name: 'Eliminar', icon: 'trash'},
  ];

  countNumbersSelect$ = this.playService.numJugads$
    .pipe(
      map(
        () => this.nums.reduce((acum, num) => acum += (num.isSelected ? 1 : 0), 0)
      )
    )

  get lettersPlayed$(): Observable<LetraBingo[]> {
    return combineLatest([
      this.playService.numJugads$,
      this.letraPlayService.availableLetters$
    ], (numberOut, lettersPlayed) => lettersPlayed)
      .pipe(
        map((lettersPlayed) => lettersPlayed.filter(letter => this.compareLetra(letter))),
      )
  }

  compareLetra(letra: LetraBingo): boolean {

    const positionsTable = this.nums.filter(item => item.isSelected)
      .map(item => item.position);

    return getIntersection(LETTER_POSITION[letra], positionsTable).length === LETTER_POSITION[letra].length
  }

  trackByNumber(item: number) {
    return item
  }

  onItemClick($event: any) {
    const {itemData} = $event

    if (itemData.value === 1) this.onEdit.emit(this.idTabla)
    else this.onDelete.emit(this.idTabla)

  }
}
