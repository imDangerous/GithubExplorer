const addNumberComma = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const deepClone = (obj: any) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const result: any = Array.isArray(obj) ? [] : {};

  for (let key of Object.keys(obj)) {
    result[key] = deepClone(obj[key]);
  }

  return result;
};

const fillZero = (width: number, str: string) => {
  return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str;
};

const getDate = (time: string) => {
  const d = new Date(time);
  return (
    d.getFullYear() +
    '/' +
    d.getMonth() +
    1 +
    '/' +
    d.getDate() +
    ' ' +
    fillZero(2, d.getHours().toString()) +
    ':' +
    fillZero(2, d.getMinutes().toString())
  );
};

export default {addNumberComma, deepClone, fillZero, getDate};
