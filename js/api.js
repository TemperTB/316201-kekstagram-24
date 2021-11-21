import { showErrorMessageToUser } from './utils.js';
import { addPictures, onClickPicture } from './pictures.js';

/**
 * Получение данных от сервера
 * @param {function} onSucess - действие с данными при их успешном получении (json)
 */
const getData = () => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      addPictures(data);
      onClickPicture(data);
    })
    .catch(() => showErrorMessageToUser('get-error'));
};

export { getData };
