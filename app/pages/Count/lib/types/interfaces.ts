import type { IHistory } from '../../../../shared/types/IHistory';

export interface IIncome {
  incomeDate: string;
  value: number;
}

export interface ICount {
  index: string;
  title: string;
  value: number;
  monthIncome: IIncome;
  history: IHistory[];
}

export type CountState = ICount[];
