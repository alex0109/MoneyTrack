import type { IHistoryCategory } from '../types/interfaces';

export const getHistoryArray = (historyObj): IHistoryCategory[] => {
  const historyEntries = Object.entries(historyObj);
  const historyArray = historyEntries.map(([index, data]) => ({
    index,
    ...data,
  }));
  return historyArray;
};
