import {Component, OnInit} from '@angular/core';
import {PlayService} from "../../services/play.service";
import {combineLatest, Observable} from "rxjs";
import {LetraBingo, LetraPlayService} from "../../services/letra-play.service";
import {TablaService} from "../../services/tabla.service";
import {Table, TablePreview} from "../../interfaces/table.interface";
import {Router} from "@angular/router";
import {TableService} from "../../services/table.service";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  tablesGame$: Observable<TablePreview[]>
  tablesGame!: Table[]

  numOut$!: Observable<number[]>
  letraPlay$!: Observable<LetraBingo[]>

  constructor(private playService: PlayService,
              private tableService: TablaService,
              private tbService: TableService,
              public letraPlayService: LetraPlayService,
              private router: Router) {


    this.tablesGame$ = combineLatest([
      // this.tableService.availableTables$,
      this.tbService.all$,
      this.playService.numJugads$
    ], (tables, numbersOut) => {
      return tables.map(table => {
        return {
          id: table.id,
          codTabla: table.codTable,
          numbers: table.data.map((_number, idx) => ({
            displayNumber: _number,
            position: idx,
            isSelected: numbersOut.includes(_number)
          }))
        } as TablePreview
      })
    })
  }

  ngOnInit(): void {

    this.numOut$ = this.playService.numJugads$

    this.letraPlay$ = this.letraPlayService.lettersAll$

    // this.tbService.all$.subscribe(console.log)
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


