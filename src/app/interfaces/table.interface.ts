export interface Table {
  codTabla: string;
  tipoTabla: string;
  data: any[];
}

export interface TableStorage extends Omit<Table, 'codTabla'> {
}
