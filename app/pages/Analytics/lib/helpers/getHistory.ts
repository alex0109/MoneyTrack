import moment from 'moment';

import type { ICategory, IHistoryCategory } from '../../../Chart/lib/types/interfaces';

export const getHistory = (arr: ICategory[]): IHistoryCategory[] => {
  const res = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].history.length; j++) {
      if (arr[i].history[j].value > 0) {
        res.push({ ...arr[i].history[j], title: arr[i].title });
      }
    }
  }

  return res
    .sort((a, b) => moment(a.date).unix() - moment(b.date).unix())
    .filter((item) => moment(item.date).isSame(moment(), 'month'));
};
