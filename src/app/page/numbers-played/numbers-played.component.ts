import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PlayService} from "../../services/play.service";
import {combineLatest, Observable} from "rxjs";

interface NumberPlayed {
  display: number;
  isSelected: boolean;
}

@Component({
  selector: 'app-numbers-played',
  templateUrl: './numbers-played.component.html',
  styleUrls: ['./numbers-played.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumbersPlayedComponent {

  numbersDisplay$: Observable<NumberPlayed[]>

  countNumberPlayed$: Observable<number> = this.playService.countNumberPlayed$

  constructor(private playService: PlayService) {
    this.numbersDisplay$ = combineLatest([
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
  }

  clearAllNumbers() {
    this.playService.clearNumbersPlayed()
  }

  pushSelect(num: number) {
    this.playService.setNumberPlay(num)
  }

}
