import moment from 'moment';

import type { IHistory } from '../../../Analytics/lib/types/interfaces';

import type { ICategory, ICategoryWithHistory, IMappedCategories } from '../types/interfaces';

export function mapCategories(
  categories: ICategory[],
  categoriesHistory: IHistory[]
): IMappedCategories {
  const currentDate = moment().format('YYYY-MM');
  const mappedCategories: IMappedCategories = {
    month: currentDate,
    total: 0,
    categories: [],
  };

  const categoryMap: { [index: string]: ICategoryWithHistory } = {};

  categoriesHistory.forEach((historyItem) => {
    const matchingCategory = categories.find(
      (category) =>
        category.index === historyItem.originalID &&
        moment(historyItem.date).format('YYYY-MM') === moment().format('YYYY-MM')
    );

    if (matchingCategory) {
      const categoryId = matchingCategory.index;

      if (!categoryMap[categoryId]) {
        categoryMap[categoryId] = { ...matchingCategory, history: [] };
      }

      categoryMap[categoryId].history.push(historyItem);
    }
  });

  mappedCategories.categories = Object.values(categoryMap).map((categoryWithHistory) => {
    const categoryTotal = categoryWithHistory.history.reduce(
      (acc, historyItem) => acc + historyItem.value,
      0
    );
    mappedCategories.total += categoryTotal;

    return { ...categoryWithHistory, count: categoryTotal };
  });

  return mappedCategories;
}
