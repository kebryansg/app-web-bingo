import {Component, OnInit} from '@angular/core';
import {PlayService} from "../../services/play.service";
import {combineLatest, Observable} from "rxjs";
import {LetraBingo, LetraPlayService} from "../../services/letra-play.service";
import {TablaService} from "../../services/tabla.service";
import {Table, TablePreview} from "../../interfaces/table.interface";
import {Router} from "@angular/router";

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
              public letraPlayService: LetraPlayService,
              private router: Router) {


    this.tablesGame$ = combineLatest([
      this.tableService.availableTables$,
      this.playService.numJugads$
    ], (tables, numbersOut) => {
      return tables.map(table => {
        return {
          codTabla: table.codTabla,
          numbers: table.data.map((_number, idx) => ({
            displayNumber: _number,
            position: idx,
            isSelected: numbersOut.includes(_number)
          }))
        } as TablePreview
      })
    })

    this.tablesGame = this.tableService.getTables()
  }

  ngOnInit(): void {

    this.numOut$ = this.playService.numJugads$

    this.letraPlay$ = this.letraPlayService.lettersAll$
  }

  letterDelete(letter: LetraBingo) {
    this.letraPlayService.setLetterPlayed(letter)
  }

  onEdit(codTabla: string) {
    this.router.navigate(['register', codTabla])
  }

  onDelete(codTabla: string) {
    this.tableService.deleteTable(codTabla)
  }

  trackByTable(index: number, item: TablePreview) {
    return item.codTabla
  }

}


