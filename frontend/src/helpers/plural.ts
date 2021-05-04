export const plural = (number: number, words: Array<string> = []) => {
  const [one = '', two = 'а', many = 'ов'] = words;

  // eslint-disable-next-line no-param-reassign
  number %= 100;
  if (number >= 5 && number <= 20) {
    return many;
  }

  // eslint-disable-next-line no-param-reassign
  number %= 10;
  return number === 1 ? one : number >= 2 && number <= 4 ? two : many;
};
