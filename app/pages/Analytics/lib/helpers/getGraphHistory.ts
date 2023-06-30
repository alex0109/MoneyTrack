import moment from 'moment';

import type { ICategory } from '../../../Chart/lib/types/interfaces';
import type { IGraphData } from '../types/interfaces';

export function getGraphHistory(arr: ICategory[]): IGraphData {
  if (arr.length === 0) {
    return {
      labels: ['0'],
      datasets: [{ data: [0] }],
    };
  }

  const dateValueMap = {};

  arr.forEach((item) => {
    item.history.forEach((historyItem) => {
      const { date, value } = historyItem;
      if (moment(date).isSame(moment(), 'month')) {
        if (dateValueMap[date]) {
          dateValueMap[date] += value;
        } else {
          dateValueMap[date] = value;
        }
      }
    });
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
