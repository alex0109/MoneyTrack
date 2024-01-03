import moment from 'moment';

import type { IGraphData, IHistory } from '../types/interfaces';

export function getGraphHistory(arr: IHistory[]): IGraphData {
  if (arr.length === 0) {
    return {
      labels: ['0'],
      datasets: [{ data: [0] }],
    };
  }

  const dateValueMap: { [key: string]: number } = {};

  arr.forEach((historyItem) => {
    const { date, value } = historyItem;
    const formattedDate = moment(date).format('YYYY-MM-DD');

    if (moment(date).isSame(moment(), 'month')) {
      if (dateValueMap[formattedDate]) {
        dateValueMap[formattedDate] += value;
      } else {
        dateValueMap[formattedDate] = value;
      }
    }
  });

  const startDate = moment().startOf('month');
  const endDate = moment().endOf('month');
  const currentDate = startDate.clone();

  const labels = [];
  const data = [];

  while (currentDate.isSameOrBefore(endDate, 'day')) {
    const formattedDate = currentDate.format('YYYY-MM-DD');

    const value = dateValueMap[formattedDate] || 0;
    data.push(value);
    labels.push(currentDate.format('D'));
    currentDate.add(1, 'day');
  }

  return { labels, datasets: [{ data }] };
}
