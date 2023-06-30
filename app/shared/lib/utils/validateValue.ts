export const validateValue = (value: string) => {
  if (!isNaN(Number(value)) && Number(value) >= 0 && value.length < 12) {
    return true;
  }

  return false;
};
