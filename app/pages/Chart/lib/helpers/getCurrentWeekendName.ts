export const getCurrentWeekendhName = (monthID: number) => {
  switch (monthID) {
    case 0:
      return 'Понеділок';

    case 1:
      return 'Вівторок';

    case 2:
      return 'Середа';

    case 3:
      return 'Четвер';

    case 4:
      return "П'ятниця";

    case 5:
      return 'Субота';

    case 6:
      return 'Неділя';

    default:
      return 'День тижня';
  }
};
