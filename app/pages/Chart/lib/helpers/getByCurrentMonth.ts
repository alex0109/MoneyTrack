import moment from 'moment';

import type { ICount } from '../../../Count/lib/types/interfaces';
import type { ICategory, IMonthsCategory } from '../types/interfaces';

export function sortByCurrentMonth(categories: ICategory[], counts: ICount[]): IMonthsCategory[] {
  const currentMonth = moment().format('YYYY-MM');

  let hasCurrentMonthData = false;

  const monthsActions: IMonthsCategory[] = [];

  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < categories[i].history.length; j++) {
      const historyDate = categories[i].history[j].date.split('-').slice(0, -1).join('-');
      if (historyDate === currentMonth) {
        hasCurrentMonthData = true;
        const existingMonth = monthsActions.find((month) => month.month === currentMonth);
        if (existingMonth) {
          const existingAction = existingMonth.actions.find(
            (action) => action.index === categories[i].index
          );
          if (existingAction) {
            existingAction.history.push({
              date: categories[i].history[j].date,
              value: categories[i].history[j].value,
            });
            existingAction.amount += categories[i].history[j].value;
          } else {
            existingMonth.actions.push({
              index: categories[i].index,
              title: categories[i].title,
              amount: categories[i].history[j].value,
              color: categories[i].color,
              icon: categories[i].icon,
              history: [
                {
                  date: categories[i].history[j].date,
                  value: categories[i].history[j].value,
                },
              ],
            });
          }
        } else {
          monthsActions.push({
            month: currentMonth,
            income: 0,
            actions: [
              {
                index: categories[i].index,
                title: categories[i].title,
                amount: categories[i].history[j].value,
                color: categories[i].color,
                icon: categories[i].icon,
                history: [
                  {
                    date: categories[i].history[j].date,
                    value: categories[i].history[j].value,
                  },
                ],
              },
            ],
          });
        }
      }
    }
  }

  for (let i = 0; i < counts.length; i++) {
    for (let j = 0; j < counts[i].history.length; j++) {
      for (let k = 0; k < monthsActions.length; k++) {
        if (counts[i].history[j].date.split('-').slice(0, -1).join('-') == monthsActions[k].month) {
          monthsActions[k].income += counts[i].history[j].value;
        }
      }
    }
  }

  if (!hasCurrentMonthData) {
    return [{ month: currentMonth, income: 0, actions: [] }];
  }

  return monthsActions;
}