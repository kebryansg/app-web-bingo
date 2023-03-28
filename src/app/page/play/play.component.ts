import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PlayService} from "../../services/play.service";
import {Observable, pluck} from "rxjs";
import {letraBingo, LetraPlayService} from "../../services/letra-play.service";
import notify from "devextreme/ui/notify";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  numPlay: number[] = [];
  tablesGame$!: Observable<{ codTabla: string, items: number[] }[]>
  tablas: any[] = []
  numOut$!: Observable<number[]>
  letraPlay$!: Observable<letraBingo[]>

  selectNumPlay: FormControl = new FormControl(null)
  letterSelectDelete!: letraBingo
  popupVisible!: boolean
  closeButtonOptions: any;
  deleteButtonOptions: any;

  constructor(private playService: PlayService,
              private activatedRoute: ActivatedRoute,
              // private storageService: StorageService,

              private letraPlayService: LetraPlayService,) {

    this.tablesGame$ = this.activatedRoute.data
      .pipe(
        pluck('tables'),
        map((items: any[]) =>
          items.map(({data, codTabla}) => ({
            codTabla,
            items: mapItems(data)
          }))
        )
      )

    this.deleteButtonOptions = {
      text: 'Eliminar',
      stylingMode: "contained",
      type: "danger",
      onClick: (e: any) => {
        this.letterDelete(this.letterSelectDelete)
        this.popupVisible = false
        const message = `Letra eliminada ${this.letterSelectDelete}`;
        notify({
          message,
          position: {
            my: 'center bottom',
            at: 'center bottom',
          },
        }, 'success', 3000);
      },
    };

    this.closeButtonOptions = {
      text: 'Cancelar',
      stylingMode: "outlined",
      onClick: (e: any) => this.popupVisible = false,
    };
  }

  ngOnInit(): void {

    Array.from({length: 75})
      .forEach((num, idx) => this.numPlay.push(idx + 1))

    this.numOut$ = this.playService.numJugads$

    this.letraPlay$ = this.letraPlayService.obsLetras$
  }

  agregarNumOut() {
    const num = this.selectNumPlay.value
    if (num) {
      this.playService.setNumberPlay(num)
      this.numPlay = this.numPlay.filter(n => n != num)
    }
  }

  letterNumber(numberPlayed: number) {
    // this.playService.clearNumberPlayed(numberPlayed);
  }

  letterDelete(letter: letraBingo) {
    this.letterSelectDelete = letter
    this.popupVisible = true
  }

}

const mapItems = (items: any[]): number[] => items.map((item: any) => {
  return [item['a'], item['b'], item['c'], item['d'], item['e'],]
}).flat()
