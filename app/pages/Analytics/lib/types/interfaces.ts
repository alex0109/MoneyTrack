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

export interface IAction {
  index: string;
  title: string;
  amount: number;
  history: IHistory[];
}

export interface IMonthsCategory {
  month: string;
  income: number;
  actions: IAction[];
}
