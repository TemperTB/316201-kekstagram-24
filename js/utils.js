/**
 * Возвращает случайное целое число из заданного диапазона [вкючительно]
 * либо false если одно из чисел отрицательно, либо to <= from
 * @param {number} from - нижний диапазон
 * @param {number} to - верхний диапазон
 * @returns {number} - целое число
 */
const getRandomIntFromTo = (from, to) => {
  if (from < 0 || to <= from) {
    return false;
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * (to - from + 1)) + from;
};

/**
 * Проверяет длину строки
 * @param {string} str - строка
 * @param {number} maxLength - максимальная длина
 * @return {boolean}
 */
const checkStrLength = (str, maxLength) => {
  if (str.length <= maxLength) {
    return true;
  }
  return false;
};

export { getRandomIntFromTo, checkStrLength };

