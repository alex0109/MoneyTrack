import moment from 'moment';

import type { ICategory, IHistoryCategory } from '../../../Chart/lib/types/interfaces';

export const getHistory = (arr: ICategory[]): IHistoryCategory[] => {
  const res: IHistoryCategory[] = [];

  arr.forEach((category) => {
    if (category.history && category.history.length > 0) {
      category.history.forEach((history) => {
        if (history.value > 0) {
          res.push({ ...history });
        }
      });
    }
  });

  return res
    .sort((a, b) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item) => moment(item.date).isSame(moment(), 'month'));
};
