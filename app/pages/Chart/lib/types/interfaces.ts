import type { IHistory } from '../../../../shared/types/IHistory';

export interface IPoint {
  x: number;
  y: number;
}

export interface IHistoryCategory extends IHistory {
  index: string;
  fromCount: string;
  note: string;
}

export interface ICategory {
  index: string;
  title: string;
  count: number;
  icon: string;
  color: string;
  percent: number;
  history: IHistoryCategory[];
}

export interface CategoryState {
  data: ICategory[];
  loading: boolean;
  error: string | null;
}

export interface IAction {
  index: string;
  title: string;
  amount: number;
  color: string;
  icon: string;
  history: IHistoryCategory[];
}

export interface IMonthsCategory {
  month: string;
  income: number;
  actions: IAction[];
}
