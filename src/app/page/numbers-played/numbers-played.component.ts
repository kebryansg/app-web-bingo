import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PlayService} from "../../services/play.service";
import {combineLatest, Observable} from "rxjs";
import {ItemPlayed} from "../../interfaces/item-played.interface";
import {AsyncPipe, NgFor} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-numbers-played',
  templateUrl: './numbers-played.component.html',
  styleUrls: ['./numbers-played.component.scss'],
  imports: [
    NgFor,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NumbersPlayedComponent {

  playService: PlayService = inject(PlayService)

  numbersDisplay$: Observable<ItemPlayed<number>[]> = combineLatest([
      this.playService.numbersAll$,
      this.playService.numJugads$
    ],
    (numbers, numbersPlayed) => {
      return numbers.map(_num => ({
        display: _num,
        isSelected: numbersPlayed.includes(_num)
      }))
    }
  )

  countNumberPlayed$: Observable<number> = this.playService.countNumberPlayed$

  clearAllNumbers() {
    this.playService.clearNumbersPlayed()
  }

  pushSelect(num: number) {
    this.playService.setNumberPlay(num)
  }

}
