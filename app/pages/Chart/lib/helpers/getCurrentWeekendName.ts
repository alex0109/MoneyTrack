export const getCurrentWeekendhName = (monthID: number) => {
  switch (monthID) {
    case 1:
      return 'Понеділок';

    case 2:
      return 'Вівторок';

    case 3:
      return 'Середа';

    case 4:
      return 'Четвер';

    case 5:
      return "П'ятниця";

    case 6:
      return 'Субота';

    case 7:
      return 'Неділя';

    default:
      return 'День тижня';
  }
};
