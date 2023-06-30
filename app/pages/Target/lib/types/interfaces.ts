import type { IHistory } from '../../../../shared/types/IHistory';

export interface ITarget {
  index: string;
  title: string;
  value: number;
  target: number;
  history: IHistory[];
}

export type TargetState = ITarget[];
