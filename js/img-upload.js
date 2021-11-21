import { isEscapeKey } from './utils.js';

const uploadFileContainer = document.querySelector('#upload-file');
const imgUploadFormContainer = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButtonContainer = imgUploadFormContainer.querySelector('.img-upload__cancel');
const scaleControlSmallerContainer = imgUploadFormContainer.querySelector('.scale__control--smaller');
const scaleControlBiggerContainer = imgUploadFormContainer.querySelector('.scale__control--bigger');
const scaleControlValueContainer = imgUploadFormContainer.querySelector('.scale__control--value');
const imgUploadPreviewContainer = imgUploadFormContainer.querySelector('.img-upload__preview').querySelector('img');
const effectsRadioContainers = imgUploadFormContainer.querySelectorAll('.effects__radio');
const effectsListContainer = imgUploadFormContainer.querySelector('.effects__list');
/**
 * Действия при клике на кнопку уменьшения изображения
 */
const onScaleControlSmallerClick = () => {
  const percent = +scaleControlValueContainer.value.substr(0, scaleControlValueContainer.value.length - 1);
  if (percent > 25) {
    scaleControlValueContainer.value = `${percent - 25}%`;
    imgUploadPreviewContainer.style.transform = `scale(${percent - 25}%)`;
  }
};

/**
 * Действия при клике на кнопку увеличения изображения
 */
const onScaleControlBiggerClick = () => {
  const percent = +scaleControlValueContainer.value.substr(0, scaleControlValueContainer.value.length - 1);
  if (percent > 25) {
    scaleControlValueContainer.value = `${percent - 25}%`;
    imgUploadPreviewContainer.style.transform = `scale(${percent - 25}%)`;
  }
};

/**
 * Добавляет обработчик клика на кнопку уменьшения добавляемого изображения
 */
const addScaleControlSmallerClick = () => {
  scaleControlSmallerContainer.addEventListener('click', onScaleControlSmallerClick);
};

/**
 * Удаляет обработчик клика на кнопку уменьшения добавляемого изображения
 */
const removeScaleControlSmallerClick = () => {
  scaleControlSmallerContainer.addEventListener('click', () => {

  });
};

/**
 * Добавляет обработчик клика на кнопку увеличения добавляемого изображения
 */
const addScaleControlBiggerClick = () => {
  scaleControlBiggerContainer.addEventListener('click', onScaleControlBiggerClick);
};

/**
 * Удаляет обработчик клика на кнопку увеличения добавляемого изображения
 */
const removeScaleControlBiggerClick = () => {
  scaleControlBiggerContainer.removeEventListener('click', onScaleControlBiggerClick);
};

/**
 * Действия при клике на изображения с эффектами
 */
const onEffectsRadioContainersClick = (evt) => {
  if (evt.target.matches('span')) {
    console.log(1);
  }
};

/**
 * Добавляет обработчик клика на кнопку увеличения добавляемого изображения
 */
const addEffectsRadioContainers = () => {
  effectsListContainer.addEventListener('change', onEffectsRadioContainersClick);
};

/**
 * Удаляет обработчик клика на кнопку увеличения добавляемого изображения
 */
const removeEffectsRadioContainers = () => {
  effectsListContainer.removeEventListener('change', onEffectsRadioContainersClick);
};

/**
 * Показывает форму загрузки изображения
 */
const openImgUploadForm = () => {
  imgUploadFormContainer.classList.remove('hidden');
  body.classList.add('modal-open');

  /**
   * Добавляет обработчики закрытия окна
   */
  const addEventForCloseImgUploadForm = () => {
    closeButtonContainer.addEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onEscKeydown);
  };

  /**
   * Скрывает форму загрузки изображения и удаляет закрытия окна
   * @param {Object} element - элемент для удаления
   */
  const removeEventForCloseImgUploadForm = () => {
    body.classList.remove('modal-open');
    imgUploadFormContainer.classList.add('hidden');
    closeButtonContainer.removeEventListener('click', onCloseButtonClick);
    document.removeEventListener('keydown', onEscKeydown);
    removeScaleControlSmallerClick();
    removeScaleControlBiggerClick();
    removeEffectsRadioContainers();
  };

  /**
   * Действие при клике мышкой
   */
  function onCloseButtonClick() {
    removeEventForCloseImgUploadForm();
  }

  /**
   * Действие при нажатии Esc
   */
  function onEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeEventForCloseImgUploadForm();
    }
  }

  addEventForCloseImgUploadForm();
  addScaleControlSmallerClick();
  addScaleControlBiggerClick();
  addEffectsRadioContainers();
};

/**
 * Добавляет обработчик при выборе изображения для загрузки
 */
const onUploadFileChange = () => {
  uploadFileContainer.addEventListener('click', openImgUploadForm);
};

export { onUploadFileChange };
