
const pictureTemplateContainer = document.querySelector('#picture').content.querySelector('.picture');


/**
 * На основание шаблона (id = picture) создает DOM элемент фотографий других пользователей.
 * @param {Object} data - данные от сервера
 * @return {Object}
 */
const makePicture = (data) => {
  const pictureContainer = pictureTemplateContainer.cloneNode(true);
  const pictureImageContainer = pictureContainer.querySelector('.picture__img');
  const pictureLikesContainer = pictureContainer.querySelector('.picture__likes');
  const pictureCommentsContainer = pictureContainer.querySelector('.picture__comments');
  pictureImageContainer.src = `/${data.url}`;
  pictureLikesContainer.textContent = data.likes;
  pictureCommentsContainer.textContent = data.comments.length;
  return pictureContainer;
};

export { makePicture };
