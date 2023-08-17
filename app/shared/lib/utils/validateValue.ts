export const validateValue = (value: number | string) => {
  if (!isNaN(Number(value)) && Number(value) > 0) {
    return true;
  }

  return false;
};
