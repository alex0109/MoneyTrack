import type { ICategoryWithHistory } from '../types/interfaces';

export function getPercantageForCategory(categories: ICategoryWithHistory[]) {
  const totalCount = categories.map((item) => item.count).reduce((a, b) => a + b, 0);

  const output = categories.map((item) => {
    const percent = item.count / (totalCount > 0 ? totalCount : 1);
    return {
      percentage: Math.trunc(percent * 10000) / 100,
      color: item.color,
    };
  });

  return output;
}
