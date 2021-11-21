import { isEscapeKey } from './utils.js';

/**
 * Шаг увеличения/уменьшения масштаба
 */
const SCALE_STEP = 25;
/**
 * Максимальный масштаб изображения
 */
const SCALE_MAX = 100;
/**
 * Минимальный масштаб изображения
 */
const SCALE_MIN = 25;

const uploadFileContainer = document.querySelector('#upload-file');
const imgUploadFormContainer = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButtonContainer = imgUploadFormContainer.querySelector('.img-upload__cancel');
const scaleControlSmallerContainer = imgUploadFormContainer.querySelector('.scale__control--smaller');
const scaleControlBiggerContainer = imgUploadFormContainer.querySelector('.scale__control--bigger');
const scaleControlValueContainer = imgUploadFormContainer.querySelector('.scale__control--value');
const imgUploadPreviewContainer = imgUploadFormContainer.querySelector('.img-upload__preview').querySelector('img');
const effectsListContainer = imgUploadFormContainer.querySelector('.effects__list');
/**
 * Действия при клике на кнопку уменьшения изображения
 */
const onScaleControlSmallerClick = () => {
  const percent = +scaleControlValueContainer.value.substr(0, scaleControlValueContainer.value.length - 1);
  if (percent > SCALE_MIN) {
    scaleControlValueContainer.value = `${percent - SCALE_STEP}%`;
    imgUploadPreviewContainer.style.transform = `scale(${percent - SCALE_STEP}%)`;
  }
};

/**
 * Действия при клике на кнопку увеличения изображения
 */
const onScaleControlBiggerClick = () => {
  const percent = +scaleControlValueContainer.value.substr(0, scaleControlValueContainer.value.length - 1);
  if (percent < SCALE_MAX) {
    scaleControlValueContainer.value = `${percent + SCALE_STEP}%`;
    imgUploadPreviewContainer.style.transform = `scale(${percent + SCALE_STEP}%)`;
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
  scaleControlSmallerContainer.removeEventListener('click', onScaleControlSmallerClick);
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
const onEffectsRadioContainersChange = (evt) => {
  imgUploadPreviewContainer.classList.remove(...imgUploadPreviewContainer.classList);
  if (evt.target.checked) {
    imgUploadPreviewContainer.classList.add(`effects__preview--${evt.target.value}`);
  }
};

/**
 * Добавляет обработчик клика на кнопку увеличения добавляемого изображения
 */
const addEffectsRadioContainers = () => {
  effectsListContainer.addEventListener('change', onEffectsRadioContainersChange);
};

/**
 * Удаляет обработчик клика на кнопку увеличения добавляемого изображения
 */
const removeEffectsRadioContainers = () => {
  effectsListContainer.removeEventListener('change', onEffectsRadioContainersChange);
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
    if (isEscapeKey(evt) &&
    !(evt.target.matches('input[class="text__hashtags"]') ||
    evt.target.matches('textarea[class="text__description"]'))) {
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
