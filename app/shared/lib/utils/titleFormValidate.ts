export const validateTitle = (title: string) => {
  if (title.length >= 3 && title.length <= 15) {
    return true;
  }

  return false;
};
