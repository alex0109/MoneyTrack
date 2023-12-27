import type { IHistory } from '../../../Analytics/lib/types/interfaces';

export interface IPoint {
  x: number;
  y: number;
}

interface ILocalCategoryHistory {
  date: string;
  value: string;
}

export interface ICategory {
  index: string;
  title: string;
  count: number;
  icon: string;
  color: string;
  percent: number;
  history: ILocalCategoryHistory[];
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
