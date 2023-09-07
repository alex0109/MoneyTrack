import moment from 'moment';

import { makeid } from '../../../../shared/lib/utils/generateID';

import type { ICount } from '../../../Count/lib/types/interfaces';
import type { ICategory, IMonthsCategory } from '../types/interfaces';

export function sortByCurrentMonth(categories: ICategory[], counts: ICount[]): IMonthsCategory[] {
  const currentMonth = moment().format('YYYY-MM');

  const monthsActions: IMonthsCategory[] = [];

  if (categories.length > 0) {
    categories.forEach((category) => {
      if (category.history && category.history.length > 0) {
        category.history.forEach((history) => {
          const historyDate = history.date.split('-').slice(0, -1).join('-');
          if (historyDate === currentMonth) {
            let existingMonth = monthsActions.find((month) => month.month === currentMonth);
            if (!existingMonth) {
              existingMonth = {
                month: currentMonth,
                income: 0,
                actions: [],
              };
              monthsActions.push(existingMonth);
            }

            const existingAction = existingMonth.actions.find(
              (action) => action.index === category.index
            );
            if (existingAction) {
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
            } else {
              existingMonth.actions.push({
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
            }
          }
        });
      }

      let existingMonth = monthsActions.find((month) => month.month === currentMonth);
      if (!existingMonth) {
        existingMonth = {
          month: currentMonth,
          income: 0,
          actions: [],
        };
        monthsActions.push(existingMonth);
      }

      const existingAction = existingMonth.actions.find(
        (action) => action.index === category.index
      );
      if (!existingAction) {
        existingMonth.actions.push({
          index: category.index,
          title: category.title,
          amount: 0,
          color: category.color,
          icon: category.icon,
          history: [
            {
              index: makeid(),
              title: '',
              date: moment().format('YYYY-MM-01'),
              value: 0,
              fromCount: '',
              categoryIndex: '',
              note: '',
            },
          ],
        });
      }
    });
  }

  counts.forEach((count) => {
    count.history.forEach((history) => {
      monthsActions.forEach((monthAction) => {
        if (history.date.split('-').slice(0, -1).join('-') === monthAction.month) {
          monthAction.income += history.value;
        }
      });
    });
  });

  return monthsActions.length === 0
    ? [{ month: currentMonth, income: 0, actions: [] }]
    : monthsActions;
}
