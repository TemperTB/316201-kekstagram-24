import { openBigPicture } from './big-picture.js';

const pictureTemplateContainer = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

/**
 * На основание шаблона (id = picture) создает DOM элемент фотографий других пользователей.
 * @param {Object} item - данные от сервера
 * @return {Object}
 */
const makePicture = (item) => {
  const pictureContainer = pictureTemplateContainer.cloneNode(true);
  const pictureImageContainer = pictureContainer.querySelector('.picture__img');
  const pictureLikesContainer = pictureContainer.querySelector('.picture__likes');
  const pictureCommentsContainer = pictureContainer.querySelector('.picture__comments');
  pictureImageContainer.src = `/${item.url}`;
  pictureLikesContainer.textContent = item.likes;
  pictureCommentsContainer.textContent = item.comments.length;
  return pictureContainer;
};

/**
 *  Добавляет картинки
 */
const addPictures = (array) => {
  const fragment = document.createDocumentFragment();
  array.forEach((item) => {
    const picture = makePicture(item);
    fragment.appendChild(picture);
  });
  picturesContainer.appendChild(fragment);
};

/**
 * Добавляет обработчик при клипе на картинку
 * @param {Object[]} data
 */
const onClickPicture = (data) => {
  picturesContainer.addEventListener('click', (evt) => {
    openBigPicture(data, evt);
  });
};

export { addPictures, onClickPicture };
