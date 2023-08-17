import type { ICount } from '../../../Count/lib/types/interfaces';
import type { ICategory, IMonthsCategory } from '../types/interfaces';

export function sortByMonths(categories: ICategory[], counts: ICount[]): IMonthsCategory[] {
  if (!Array.isArray(categories) || categories.length === 0) {
    return [];
  }

  const dates = categories
    .filter((category) => category.history && category.history.length > 0)
    .map((category) => category.history.map((history) => history.date))
    .flat()
    .map((date) => date.split('-').slice(0, -1).join('-'));

  if (dates.length === 0) {
    return [];
  }

  const uniqueMonthsMap: { [month: string]: boolean } = {};
  categories.forEach((category) => {
    if (category.history && category.history.length > 0) {
      category.history.forEach((history) => {
        const month = history.date.split('-').slice(0, -1).join('-');
        uniqueMonthsMap[month] = true;
      });
    }
  });

  counts.forEach((count) => {
    if (count.history && count.history.length > 0) {
      count.history.forEach((history) => {
        const month = history.date.split('-').slice(0, -1).join('-');
        uniqueMonthsMap[month] = true;
      });
    }
  });

  const uniqueMonths = Object.keys(uniqueMonthsMap);

  const monthsActions: IMonthsCategory[] = uniqueMonths.map((month) => ({
    month,
    income: 0,
    actions: [],
  }));

  const categoryIndexMap: { [index: number]: ICategory } = {};
  categories.forEach((category) => {
    categoryIndexMap[category.index] = category;
  });

  categories.forEach((category) => {
    if (category.history && category.history.length > 0) {
      category.history.forEach((history) => {
        const month = history.date.split('-').slice(0, -1).join('-');
        const monthAction = monthsActions.find((action) => action.month === month);

        if (monthAction && category.history && category.history.length > 0) {
          const existingAction = monthAction.actions.find(
            (action) => action.index === category.index
          );

          if (existingAction) {
            // Обновляем существующую запись
            if (history.value !== 0) {
              existingAction.history.push({
                index: history.index,
                title: category.title,
                date: history.date,
                value: history.value,
                fromCount: history.fromCount,
                categoryIndex: history.categoryIndex,
                note: history.note,
              });

              existingAction.amount += history.value;
            }
          } else if (history.value !== 0) {
            // Добавляем новую запись, если value не равен нулю
            if (!monthAction.actions) {
              monthAction.actions = [];
            }

            monthAction.actions.push({
              index: category.index,
              title: category.title,
              amount: history.value,
              color: category.color,
              icon: category.icon,
              history: [
                {
                  index: history.index,
                  title: category.title,
                  date: history.date,
                  value: history.value,
                  fromCount: history.fromCount,
                  categoryIndex: history.categoryIndex,
                  note: history.note,
                },
              ],
            });

            if (monthAction.actions.length > 12) {
              monthAction.actions.shift();
            }
          }
        }
      });
    }
  });

  counts.forEach((count) => {
    if (count.history && count.history.length > 0) {
      count.history.forEach((history) => {
        const month = history.date.split('-').slice(0, -1).join('-');
        const monthAction = monthsActions.find((action) => action.month === month);

        if (monthAction) {
          monthAction.income += history.value;
        }
      });
    }
  });

  return monthsActions;
}
