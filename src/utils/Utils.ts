/**
 * 3자리 수 마다 컴마 추가
 *
 * @param x : number
 */
const addNumberComma = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 깊은 복사를 위한 함수
 *
 * @param obj
 */
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

/**
 * 원하는 자리수에 맞게 0 덧대기
 *
 * @param width: 추가할 길이
 * @param str: 문자열
 */
const fillZero = (width: number, str: string) => {
  return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str;
};

/**
 * YYYY/MM/DD HH:MM
 *
 * @param time: 시간
 */
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
