export interface TableRowInterface {
  _id: string;
  data: Record<string, string>,
  kids: Record<string, { records: TableRowInterface[] }>,
}
