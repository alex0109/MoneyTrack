import type { IAction } from '../types/interfaces';

export function getPercantageForCategory(actions: IAction[]) {
  const totalCount = actions.map((item) => item.amount).reduce((a, b) => a + b, 0);

  const output = actions.map((item) => {
    const percent = item.amount / (totalCount > 0 ? totalCount : 1);
    return {
      percentage: Math.trunc(percent * 10000) / 100,
      color: item.color,
    };
  });

  return output;
}
