export const handleValidEmail = (val: string) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  if (val.length === 0) {
    return false;
  } else if (reg.test(val) === false) {
    return false;
  } else if (reg.test(val) === true) {
    return true;
  }
};
