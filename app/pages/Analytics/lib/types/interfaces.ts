export interface IDateGroupItem {
  title: string;
  value: number;
}

export interface IDateGroupes {
  date: string;
  values: IDateGroupItem[];
}

export interface IGraphData {
  labels: string[];
  datasets: { data: number[] }[];
}
