import moment from 'moment';

import type { IHistory } from '../../../../shared/types/IHistory';

import type { IDateGroupes } from '../types/interfaces';

export const groupByDate = (inputArray: IHistory[]): IDateGroupes[] => {
  const groupedData = {};

  inputArray.forEach((obj) => {
    const date = obj.date;

    if (!groupedData[date]) {
      groupedData[date] = {
        date: date,
        values: [],
      };
    }

    groupedData[date].values.push({
      title: obj.title,
      value: obj.value,
    });
  });

  const resultArray = Object.values(groupedData);

  return resultArray.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
};
