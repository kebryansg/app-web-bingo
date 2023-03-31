import {Component} from '@angular/core';
import {PlayService} from "../../services/play.service";
import {combineLatest, Observable} from "rxjs";
import {LetraBingo, LetraPlayService} from "../../services/letra-play.service";
import {TablaService} from "../../services/tabla.service";
import {TablePreview} from "../../interfaces/table.interface";
import {Router} from "@angular/router";
import {TableService} from "../../services/table.service";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {
  tablesGame$: Observable<TablePreview[]>

  letraPlay$: Observable<LetraBingo[]>
  countNumberPlayed$: Observable<number> = this.playService.countNumberPlayed$

  constructor(private playService: PlayService,
              private tableService: TablaService,
              private tbService: TableService,
              public letraPlayService: LetraPlayService,
              private router: Router) {
    this.letraPlay$ = this.letraPlayService.lettersAll$

    this.tablesGame$ = combineLatest([
      this.tbService.all$,
      this.playService.numJugads$
    ], (tables, numbersOut) => {
      return tables.map(table => {
        const numbers = table.data.map((_number, idx) => ({
          displayNumber: _number,
          position: idx,
          isSelected: numbersOut.includes(_number)
        }))
        return {
          id: table.id,
          codTabla: table.codTable,
          numbersPlayed: numbers.reduce(
            (acc, _number) => acc + (_number.isSelected ? 1 : 0)
            , 0),
          numbers,
        } as TablePreview
      }).sort((a, b) => b.numbersPlayed - a.numbersPlayed)
    });
  }

  letterDelete(letter: LetraBingo) {
    this.letraPlayService.setLetterPlayed(letter)
  }

  onEdit(idTabla: number) {
    this.router.navigate(['register', idTabla])
  }

  async onDelete(codTabla: number) {
    await this.tbService.deleteTable(codTabla).toPromise()
  }

  trackByTable(index: number, item: TablePreview) {
    return item.codTabla
  }

}


