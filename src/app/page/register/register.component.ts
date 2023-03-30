import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TableService} from "../../services/table.service";
import {TableView} from "../../interfaces/table.interface";
import {chunk} from "../../utils/array.util";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formItem!: FormGroup;
  tipoTabla: string[] = ['Normal']

  isEdit: boolean = false;

  tabla: any = []

  constructor(private fb: FormBuilder,
              private router: Router,
              private tableService: TableService,
              private activatedRoute: ActivatedRoute,) {
    this.buildForm()
  }

  ngOnInit(): void {
    this.setData((this.activatedRoute.snapshot.data as any).tabla);
  }

  buildForm() {
    this.formItem = this.fb.group({
      id: [0, [Validators.required]],
      codTable: [null, [Validators.required]],
      typeTable: ['Normal', [Validators.required]],
    })
    this.setDataDefault()
  }

  setDataDefault() {
    for (let idx = 1; idx <= 5; idx++)
      this.tabla.push({ID: idx, a: 0, b: 0, c: 0, d: 0, e: 0})
  }

  setData(data: TableView) {
    if (!data) return

    this.isEdit = true
    this.formItem.patchValue({
      id: data.id,
      codTable: data.codTable,
      typeTable: data.typeTable,
    })

    this.tabla = [...chunkData(data.data)]

    this.codTable.disable()
  }

  onFocusedCellChanging(e: any) {
    e.isHighlighted = true;
  }

  async registroTabla() {
    this.formItem.markAllAsTouched()

    if (this.formItem.invalid) return

    let {codTable, typeTable, id} = this.formItem.getRawValue()

    const payload = {
      codTable: codTable,
      typeTable: typeTable,
      isActive: true,
      data: JSON.stringify(mapItems(this.tabla))
    }

    const resolvePromise = (this.isEdit ?
      this.tableService.updateTable(id, payload as any)
      : this.tableService.createTable(payload as any))
    resolvePromise.toPromise()
      .then(
        () => this.clearScreen()
      )

  }

  clearScreen() {
    this.isEdit = false
    this.formItem.reset({
      id: 0,
      typeTable: 'Normal'
    })
    this.tabla = []
    this.setDataDefault()

    this.router.navigate(['register'])
  }

  //#region Getters
  get codTable(): FormControl {
    return this.formItem.get('codTable') as FormControl;
  }

  get typeTable(): FormControl {
    return this.formItem.get('typeTable') as FormControl;
  }

  //#endregion

}


const chunkData = (data: number[]) => {
  const _chunkData = chunk(data, 5)

  return _chunkData.map(([a, b, c, d, e], idx) =>
    ({ID: idx, a, b, c, d, e})
  )
}

const mapItems = (items: any[]): number[] => items.map((item: any) => {
  return [item['a'], item['b'], item['c'], item['d'], item['e'],]
}).flat()
