// For table serial numbers
export const SerialNum = (limit: number, page: number, index: number) => {
  let value = limit * page - limit + index + 1;
  if (value < 10) {
    return "0" + value;
  }
  return value;
};
