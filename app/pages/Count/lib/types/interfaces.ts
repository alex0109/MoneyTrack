import type { IHistory } from '../../../../shared/types/IHistory';

export interface ICount {
  index: string;
  title: string;
  value: number;
  history: IHistory[];
}

export type CountState = {
  data: ICount[];
  loading: boolean;
  error: string | null;
};
