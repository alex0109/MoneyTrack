import type { IHistory } from '../../../Analytics/lib/types/interfaces';

interface ITargetHistory extends IHistory {
  fromCount: string;
}

export interface ITarget {
  index: string;
  title: string;
  value: number;
  target: number;
  hisory: ITargetHistory[];
}

// export type ITargetState = {
//   data: ITarget[];
//   loading: boolean;
//   error: string | null;
// };
