import type { IHistory } from '../../../../shared/types/IHistory';

export interface IPoint {
  x: number;
  y: number;
}

export interface ICategory {
  index: string;
  title: string;
  count: number;
  icon: string;
  color: string;
  percent: number;
  history: IHistory[];
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
  history: IHistory[];
}

export interface IMonthsCategory {
  month: string;
  income: number;
  actions: IAction[];
}
