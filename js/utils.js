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

/**
 * Проверка на нажатие клавиши Escape в разных браузерах
 * @param {*} evt
 * @returns {string}
 */
const isEscapeKey = (evt) => evt.key === 'Escape';

/**
 * Показывает пользователю сообщение о неудачной отправке.
 * @param {string} index - id template в разметке
 */
const showErrorMessageToUser = (index) => {
  const messageTemplateContainer = document.querySelector(`#${index}`).content.querySelector('.error');
  const messageToUser = messageTemplateContainer.cloneNode(true);
  const bodyContainer = document.querySelector('body');
  bodyContainer.appendChild(messageToUser);

  /**
   * Добавляет обработчик закрытия окна
   */
  const addEventForCloseWindow = () => {
    document.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageEscKeydown);
  };

  /**
   * Удаляет элемент и обработчики закрытия окна
   * @param {Object} element - элемент для удаления
   */
  const removeEventForCloseWindow = (element) => {
    element.remove();
    document.removeEventListener('click', onMessageClick);
    document.removeEventListener('keydown', onMessageEscKeydown);
  };

  /**
   * Действие при клике мышкой
   */
  function onMessageClick() {
    removeEventForCloseWindow(messageToUser);
  }

  /**
   * Действие при нажатии Esc
   */
  function onMessageEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeEventForCloseWindow(messageToUser);
    }
  }

  addEventForCloseWindow();
};

export { getRandomIntFromTo, checkStrLength, showErrorMessageToUser, isEscapeKey };

