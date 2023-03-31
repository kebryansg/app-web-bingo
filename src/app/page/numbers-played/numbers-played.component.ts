import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PlayService} from "../../services/play.service";
import {combineLatest, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

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

  countNumberPlayed$: Observable<number> = this.playService.numJugads$
    .pipe(
      map(numbersPlayed => numbersPlayed.length)
    )

  constructor(private playService: PlayService) {
    this.numbersDisplay$ = combineLatest([
        of(this.generateNumbers()),
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

  generateNumbers() {
    return Array.from({length: 75})
      .map((_value, idx) => (idx + 1))
  }

  pushSelect(num: number) {
    this.playService.setNumberPlay(num)
  }

}
