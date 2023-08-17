import moment from 'moment';

import type { IHistoryCategory } from '../../../Chart/lib/types/interfaces';
import type { IDateGroupes } from '../types/interfaces';

export const groupByDate = (inputArray: IHistoryCategory[]): IDateGroupes[] => {
  const groupedData = {};

  inputArray.forEach((obj) => {
    const date = moment(obj.date).format('YYYY-MM-DD');

    if (!groupedData[date]) {
      groupedData[date] = {
        date: date,
        values: [],
      };
    }

    groupedData[date].values.push({
      title: obj.title,
      index: obj.index,
      value: obj.value,
      fromCount: obj.fromCount,
      note: obj.note,
      date: obj.date,
      categoryIndex: obj.categoryIndex,
    });
  });

  const resultArray = Object.values(groupedData);

  return resultArray.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
};
