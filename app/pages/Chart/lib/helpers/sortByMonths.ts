import type { ICount } from '../../../Count/lib/types/interfaces';
import type { ICategory, IMonthsCategory } from '../types/interfaces';

export function sortByMonths(categories: ICategory[], counts: ICount[]): IMonthsCategory[] {
  const dates = categories
    .map((category) => category.history.map((history) => history.date))
    .flat()
    .map((date) => date.split('-').slice(0, -1).join('-'));

  const monthsActions: IMonthsCategory[] = dates
    .filter((element, index) => dates.indexOf(element) === index)
    .sort((a, b) => Number(new Date(a)) - Number(new Date(b)))
    .map((date) => ({ month: date, income: 0, actions: [] }));

  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < categories[i].history.length; j++) {
      for (let q = 0; q < monthsActions.length; q++) {
        if (
          categories[i].history[j].date.split('-').slice(0, -1).join('-') == monthsActions[q].month
        ) {
          const existingAction = monthsActions[q].actions.find(
            (action) => action.index === categories[i].index
          );

          if (existingAction) {
            existingAction.history.push({
              index: categories[i].history[j].index,
              date: categories[i].history[j].date,
              value: categories[i].history[j].value,
              fromCount: categories[i].history[j].fromCount,
              note: categories[i].history[j].note,
            });

            existingAction.amount += categories[i].history[j].value;
          } else {
            monthsActions[q].actions.push({
              index: categories[i].index,
              title: categories[i].title,
              amount: categories[i].history[j].value,
              color: categories[i].color,
              icon: categories[i].icon,
              history: [
                {
                  index: categories[i].history[j].index,
                  date: categories[i].history[j].date,
                  value: categories[i].history[j].value,
                  fromCount: categories[i].history[j].fromCount,
                  note: categories[i].history[j].note,
                },
              ],
            });
          }

          if (monthsActions[q].actions.length > 12) {
            monthsActions[q].actions.shift();
          }
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

  return monthsActions;
}
