import type { IAction, IHistoryState, IMonthsCategory } from '../types/interfaces';

export function sortByMonths(history: IHistoryState): IMonthsCategory[] {
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
