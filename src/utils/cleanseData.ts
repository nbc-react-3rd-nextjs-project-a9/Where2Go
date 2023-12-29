export const cleanObj = <T>(obj: T): T => {
  for (let key in obj) {
    if (!Boolean(obj[key])) {
      delete obj[key];
    }
  }
  return obj;
};
