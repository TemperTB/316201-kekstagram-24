import { showErrorMessageToUser } from './utils.js';

/**
 * Получение данных от сервера
 * @param {function} onSucess - действие с данными при их успешном получении (json)
 */
const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      const picturesContainer = document.querySelector('.pictures');
      data.forEach((item) => {
        const picture = onSuccess(item);
        picturesContainer.prepend(picture);
      });

    })
    .catch(() => showErrorMessageToUser('get-error'));
};

export { getData };
