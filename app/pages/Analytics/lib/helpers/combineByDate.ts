import moment from 'moment';

import type { IDateGroupes, IHistory, IHistoryState } from '../types/interfaces';

interface IGroupedData {
  [key: string]: IDateGroupes;
}

const groupByDate = (inputArray: IHistory[] = []): IDateGroupes[] => {
  if (!Array.isArray(inputArray) || inputArray.length === 0) {
    return [];
  }

  const groupedData: IGroupedData = {};

  inputArray.forEach((obj) => {
    if (!obj || !obj.date) {
      return;
    }

    const date = moment(obj.date).format('YYYY-MM-DD');

    if (!groupedData[date] && moment().format('YYYY-MM') === moment(obj.date).format('YYYY-MM')) {
      groupedData[date] = {
        date: date,
        values: [],
      };
    }

    if (moment().format('YYYY-MM') === moment(obj.date).format('YYYY-MM')) {
      groupedData[date].values.push({
        title: obj.title,
        index: obj.index,
        value: obj.value,
        date: obj.date,
        originalID: obj.originalID,
        fromCount: obj.fromCount ? obj.fromCount : '',
        note: obj.note ? obj.note : '',
      });
    }
  });

  const resultArray: IDateGroupes[] = Object.values(groupedData);

  return resultArray.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
};

export const combineByDate = (fullHistory: IHistoryState): IDateGroupes[] => {
  const combinedArray: IHistory[] = [
    ...fullHistory.counts,
    ...fullHistory.targets,
    ...fullHistory.categories,
  ];

  const sortedArray = combinedArray.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());

  const groupedByDate = groupByDate(sortedArray);

  return groupedByDate;
};
