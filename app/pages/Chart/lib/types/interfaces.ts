import type { IHistory } from '../../../Analytics/lib/types/interfaces';

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
}

export interface ICategoryWithHistory extends ICategory {
  history: IHistory[];
}

export interface IMappedCategories {
  month: string;
  total: number;
  categories: ICategoryWithHistory[];
}
