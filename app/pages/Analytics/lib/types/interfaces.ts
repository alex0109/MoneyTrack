export interface IDateGroupItem {
  index: string;
  title: string;
  value: number;
  fromCount: string;
  note: string;
  date: string;
  categoryIndex: string;
}

export interface IDateGroupes {
  date: string;
  values: IDateGroupItem[];
}

export interface IGraphData {
  labels: string[];
  datasets: { data: number[] }[];
}
