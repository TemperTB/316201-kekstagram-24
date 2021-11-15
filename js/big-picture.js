import { isEscapeKey } from './utils.js';

let data;

const bigPictureContainer = document.querySelector('.big-picture');
const imageContainer = bigPictureContainer.querySelector('.big-picture__img');
const image = imageContainer.querySelector('img');
const likeCountContainer = bigPictureContainer.querySelector('.likes-count');
const commentCountContainer = bigPictureContainer.querySelector('.comments-count');
const descriptionContainer = bigPictureContainer.querySelector('.social__caption');
const commentContainer = bigPictureContainer.querySelector('.social__comments');
const smallLikeCountContainer = document.querySelector('.social__comment-count');
const smallCommentsCountContainer = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const closeButtonContainer = bigPictureContainer.querySelector('.big-picture__cancel');

/**
 * Сохраняет данные с сервера в массив data
 * @param {Object[]} array
 */
const saveDataForBigPicture = (array) => {
  data = array;
};

/**
 * Добавляет комментарии к картинке
 * @param {Object[]} array - массив с комментариями
 */
const addComments = (array) => {
  array.forEach((element) => {
    const newElement = document.createElement('li');
    newElement.classList.add('social__comment');
    const elementImg = document.createElement('img');
    elementImg.classList.add('social__picture');
    elementImg.src = element.avatar;
    elementImg.alt = element.avatar;
    elementImg.width = '35';
    elementImg.height = '35';
    const elementParagraph = document.createElement('p');
    elementParagraph.classList.add('social__text');
    elementParagraph.textContent = element.message;
    newElement.appendChild(elementImg);
    newElement.appendChild(elementParagraph);
    commentContainer.appendChild(newElement);
  });
};

/**
 * Открывает окно с картинкой при клике на любое изображение
 * @param {Object} evt
 */
const openBigPicture = (evt) => {
  if (!evt.target.matches('img')) {
    return;
  }
  let isExists = false;
  data.forEach((element) => {
    if (`/${element.url}` === evt.target.getAttribute('src')) {
      image.src = element.url;
      likeCountContainer.textContent = element.likes;
      commentCountContainer.textContent = element.comments.length;
      descriptionContainer.textContent = element.description;
      isExists = true;
      commentContainer.textContent = '';
      addComments(element.comments);
    }
  });

  if(!isExists) {
    return;
  }

  bigPictureContainer.classList.remove('hidden');
  smallLikeCountContainer.classList.add('hidden');
  smallCommentsCountContainer.classList.add('hidden');
  body.classList.add('modal-open');

  const addEventForCloseBigPicture = () => {
    closeButtonContainer.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onEscKeydown);
  };

  /**
     * Удаляет элемент и обработчики закрытия окна
     * @param {Object} element - элемент для удаления
     */
  const removeEventForCloseBigPicture = () => {
    body.classList.remove('modal-open');
    bigPictureContainer.classList.add('hidden');
    closeButtonContainer.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onEscKeydown);
  };

  /**
     * Действие при клике мышкой
     */
  function onCloseButtonClick() {
    removeEventForCloseBigPicture();
  }

  /**
     * Действие при нажатии Esc
     */
  function onEscKeydown(e) {
    if (isEscapeKey(e)) {
      e.preventDefault();
      removeEventForCloseBigPicture();
    }
  }

  addEventForCloseBigPicture();
};

export { saveDataForBigPicture, openBigPicture };
