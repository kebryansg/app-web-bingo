import {Component} from '@angular/core';
import {PlayService} from "../../services/play.service";

@Component({
  selector: 'app-numbers-played',
  templateUrl: './numbers-played.component.html',
  styleUrls: ['./numbers-played.component.scss']
})
export class NumbersPlayedComponent {

  numbersAll!: number[]


  constructor(public playService: PlayService) {
    this.playService.loadData()
    this.generateNumbers()
  }

  generateNumbers() {
    this.numbersAll = Array.from({length: 75})
      .map((_value, idx) => (idx + 1))
  }

  pushSelect(num: number) {
    this.playService.setNumberPlay(num)
  }

}
