export interface TableResponse {
  id: number;
  codTable: string;
  typeTable: string;
  isActive: boolean;
  creationDate?: Date;
  updateDate?: Date;
  data: string;
}

export interface TableView extends Omit<TableResponse, 'data'> {
  data: number[]
}

export type CreateDtoTable = Omit<TableView, 'id' | 'creationDate' | 'updateDate'>

export interface Table {
  creationDate?: Date;
  codTabla: string;
  tipoTabla: string;
  data: any[];
}

export interface CrudTable {
  raw: any[],
  affected: number
}



export interface TablePreview {
  codTabla: string;
  id: number;
  numbers: ItemNumber[]
}

export interface TableStorage extends Omit<Table, 'codTabla'> {
}

export interface ItemNumber {
  position: number,
  displayNumber: number,
  isSelected: boolean,
}
