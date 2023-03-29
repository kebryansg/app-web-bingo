export interface Table {
  creationDate?: Date;
  codTabla: string;
  tipoTabla: string;
  data: any[];
}

export interface TableStorage extends Omit<Table, 'codTabla'> {
}

export interface ItemNumber {
  position: number,
  displayNumber: number,
  isSelected: boolean,
}

export interface TablePreview {
  codTabla: string;
  numbers: ItemNumber[]
}
