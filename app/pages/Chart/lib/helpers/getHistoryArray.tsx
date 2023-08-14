import type { ICategory, IHistoryCategory } from '../types/interfaces';

// export const getHistoryArray = (array: ICategory[]) => array.map((obj) => {
//     const historyEntries = Object.entries(obj.history);
//     const historyArray = historyEntries.map(([index, data]) => ({
//       index,
//       ...data,
//     }));
//     return historyArray;
//   });

export const getHistoryArray = (historyObj): IHistoryCategory[] => {
  const historyEntries = Object.entries(historyObj);
  const historyArray = historyEntries.map(([index, data]) => ({
    index,
    ...data,
  }));
  return historyArray;
};
