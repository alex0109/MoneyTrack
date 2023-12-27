export interface IDateGroupItem {
  index: string;
  title: string;
  value: number;
  fromCount: string;
  note: string;
  date: string;
  originalID: string;
}

export interface IDateGroupes {
  date: string;
  values: IDateGroupItem[];
}

export interface IGraphData {
  labels: string[];
  datasets: { data: number[] }[];
}

export interface IHistory {
  date: string;
  value: number;
  index: string;
  originalID: string;
  title: string;
  fromCount?: string;
  note?: string;
}

export interface IHistoryState {
  counts: IHistory[];
  targets: IHistory[];
  categories: IHistory[];
}
