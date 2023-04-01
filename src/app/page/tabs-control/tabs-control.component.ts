import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  standalone:true,
  selector: 'app-tabs-control',
  imports:[
    RouterModule
  ],
  templateUrl: './tabs-control.component.html',
  styleUrls: ['./tabs-control.component.scss']
})
export class TabsControlComponent {

}
