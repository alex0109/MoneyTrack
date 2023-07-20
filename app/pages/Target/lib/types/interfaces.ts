export interface ITarget {
  index: string;
  title: string;
  value: number;
  target: number;
}

export type TargetState = {
  data: ITarget[];
  loading: boolean;
  error: string | null;
};
