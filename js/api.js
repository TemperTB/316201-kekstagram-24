import { showErrorMessageToUser } from './utils.js';
import { saveDataForBigPicture, openBigPicture } from './big-picture.js';

/**
 * Получение данных от сервера
 * @param {function} onSucess - действие с данными при их успешном получении (json)
 */
const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      const picturesContainer = document.querySelector('.pictures');
      const fragment = document.createDocumentFragment();
      data.forEach((item) => {
        const picture = onSuccess(item);
        fragment.appendChild(picture);
      });
      picturesContainer.appendChild(fragment);
      saveDataForBigPicture(data);
      picturesContainer.addEventListener('click', openBigPicture);

    })
    .catch(() => showErrorMessageToUser('get-error'));
};

export { getData };
