import type { IHistory } from '../../../../shared/types/IHistory';

interface ITargetHistory extends IHistory {
  index: string;
  fromCount: string;
}

export interface ITarget {
  index: string;
  title: string;
  value: number;
  target: number;
  hisory: ITargetHistory[];
}

export type TargetState = {
  data: ITarget[];
  loading: boolean;
  error: string | null;
};
