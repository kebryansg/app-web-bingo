import {Component, OnInit} from '@angular/core';
import {PlayService} from "../../services/play.service";
import {Observable} from "rxjs";
import {LetraBingo, LetraPlayService} from "../../services/letra-play.service";
import {TablaService} from "../../services/tabla.service";
import {Table} from "../../interfaces/table.interface";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  // tablesGame$!: Observable<{ codTabla: string, items: number[] }[]>
  tablesGame!: Table[]

  numOut$!: Observable<number[]>
  letraPlay$!: Observable<LetraBingo[]>

  constructor(private playService: PlayService,
              private tableService: TablaService,
              public letraPlayService: LetraPlayService,) {

    this.tablesGame = this.tableService.getTables()
  }

  ngOnInit(): void {

    this.numOut$ = this.playService.numJugads$

    this.letraPlay$ = this.letraPlayService.lettersAll$
  }

  letterDelete(letter: LetraBingo) {
    this.letraPlayService.setLetterPlayed(letter)
  }

}


