import moment from 'moment';

import type { IHistory, IHistoryState } from '../../../Analytics/lib/types/interfaces';
import type { IAction, IMonthsCategory } from '../types/interfaces';

export function transformHistoryToMonthsCategory(history: IHistoryState): IMonthsCategory[] {
  const allHistories: IHistory[] = [...history.counts, ...history.targets, ...history.categories];

  const transformedArray: IMonthsCategory[] = [];

  allHistories.forEach((item: IHistory) => {
    const month = moment(item.date).format('YYYY-MM');
    const existingMonthIndex = transformedArray.findIndex((entry) => entry.month === month);

    if (existingMonthIndex !== -1) {
      transformedArray[existingMonthIndex].income += item.value;

      const existingActionIndex = transformedArray[existingMonthIndex].actions.findIndex(
        (action) => action.index === item.index
      );

      if (existingActionIndex !== -1) {
        transformedArray[existingMonthIndex].actions[existingActionIndex].amount += item.value;
      } else {
        transformedArray[existingMonthIndex].actions.push({
          ...item,
          amount: item.value,
        });
      }
    } else {
      transformedArray.push({
        month,
        income: item.value,
        actions: [
          {
            ...item,
            amount: item.value,
          },
        ],
      });
    }
  });

  // Сортировка массива по месяцам
  transformedArray.sort((a, b) => moment(a.month).unix() - moment(b.month).unix());

  return transformedArray;
}

export function processHistory(history: IHistoryState): IMonthsCategory[] {
  const sortedHistories = history.counts
    .concat(history.targets, history.categories)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const result: IMonthsCategory[] = [];

  let currentMonth: string | null = null;
  let currentIncome = 0;
  let currentActions: IAction[] = [];

  for (const entry of sortedHistories) {
    const month = entry.date.substring(0, 7);

    if (currentMonth !== null && currentMonth !== month) {
      result.push({
        month: currentMonth,
        income: currentIncome,
        actions: currentActions,
      });

      currentMonth = month;
      currentIncome = 0;
      currentActions = [];
    } else if (currentMonth === null) {
      currentMonth = month;
    }

    if (entry.index.startsWith('100')) {
      currentIncome += entry.value;
    }

    const existingAction = currentActions.find((action) => action.index === entry.originalID);

    if (existingAction) {
      existingAction.amount += entry.value;
      existingAction.history.push(entry);
    } else {
      currentActions.push({
        index: entry.originalID,
        title: entry.title,
        amount: entry.value,
        history: [entry],
      });
    }
  }

  // Process the last month
  if (currentMonth !== null) {
    result.push({
      month: currentMonth,
      income: currentIncome,
      actions: currentActions,
    });
  }

  return result;
}
