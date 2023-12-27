import type { IHistory } from '../../../Analytics/lib/types/interfaces';

export interface ICount {
  index: string;
  title: string;
  value: number;
  history: IHistory[];
}

// export type ICountState = {
//   data: ICount[];
//   loading: boolean;
//   error: string | null;
// };
