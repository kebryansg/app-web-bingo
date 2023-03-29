import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {TablaService} from "../../services/tabla.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formItem!: FormGroup;
  tipoTabla: string[] = ['Normal']

  tabla: any = []

  constructor(private fb: FormBuilder,
              private tablaService: TablaService,
              private activatedRoute: ActivatedRoute,) {
    this.buildForm()
  }

  ngOnInit(): void {
    this.setData((this.activatedRoute.snapshot.data as any).tabla);
  }

  buildForm() {
    this.formItem = this.fb.group({
      codTabla: [null, [Validators.required]],
      tipoTabla: ['Normal', [Validators.required]],
    })
    this.setDataDefault()
  }

  setDataDefault() {
    for (let idx = 1; idx <= 5; idx++)
      this.tabla.push({ID: idx, a: 0, b: 0, c: 0, d: 0, e: 0})
  }

  setData(data: any) {
    if (!data) return

    this.formItem.patchValue({
      codTabla: data.codTabla,
      tipoTabla: data.tipoTabla,
    })
    this.tabla = [...data.data]

    this.formItem.controls['codTabla'].disable()
  }

  onFocusedCellChanging(e: any) {
    e.isHighlighted = true;
  }

  async registroTabla() {
    let {codTabla, tipoTabla} = this.formItem.getRawValue()

    codTabla = codTabla.includes('dtb') ? codTabla : 'dtb_' + codTabla
    this.tablaService.setTable(codTabla, {tipoTabla, data: [...this.tabla]})
    this.clearScreen()
  }

  clearScreen() {
    this.formItem.reset({
      tipoTabla: 'Normal'
    })
    this.tabla = []
    this.setDataDefault()
  }

}
