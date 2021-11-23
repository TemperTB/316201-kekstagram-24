import { isEscapeKey, addErrorBlock } from './utils.js';

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
/**
 * Максимальная длина описания
 */
const MAX_DESCRIPTION_LENGTH = 140;
/**
 * Регулярное выражение для проверки хэштегов
 */
const REGEXP_FOR_HASHTAG = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;


const uploadFileContainer = document.querySelector('#upload-file');
const imgUploadFormContainer = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButtonContainer = imgUploadFormContainer.querySelector('.img-upload__cancel');
const scaleControlSmallerContainer = imgUploadFormContainer.querySelector('.scale__control--smaller');
const scaleControlBiggerContainer = imgUploadFormContainer.querySelector('.scale__control--bigger');
const scaleControlValueContainer = imgUploadFormContainer.querySelector('.scale__control--value');
const imgUploadPreviewContainer = imgUploadFormContainer.querySelector('.img-upload__preview').querySelector('img');
const effectsListContainer = imgUploadFormContainer.querySelector('.effects__list');
const buttonSubmitContainer = imgUploadFormContainer.querySelector('.img-upload__submit');
const descriptionContainer = imgUploadFormContainer.querySelector('.text__description');
const hashtagsContainer = imgUploadFormContainer.querySelector('.text__hashtags');

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
 * Действия при клике на изображения с эффектами
 */
const onEffectsRadioContainersChange = (evt) => {
  imgUploadPreviewContainer.classList.remove(...imgUploadPreviewContainer.classList);
  if (evt.target.checked) {
    imgUploadPreviewContainer.classList.add(`effects__preview--${evt.target.value}`);
  }
};

/**
 * Действия при нажатии на кнопку "Опубликовать"
 */
const validateForm = (evt) => {
  const errorBlocks = imgUploadFormContainer.querySelectorAll('.text__error');
  for (const errorBlock of errorBlocks) {
    errorBlock.remove();
  }
  let hasError = false;

  const hashtagString = hashtagsContainer.value.trim().toLowerCase();
  const hashtags = hashtagString.split(' ');
  if (hashtags.length > 5) {
    hasError = true;
    addErrorBlock(hashtagsContainer, 'Не больше 5-ти хэштегов');
  }

  for (const hashtag of hashtags) {
    if (!REGEXP_FOR_HASHTAG.test(hashtag)) {
      hasError = true;
      addErrorBlock(hashtagsContainer, 'Проверьте правильность написанных хэштегов: начинаются с #, но не могут состоять из символа #, не содержат недопустимых знаков (#, @, $ и т. п.), имеют не больше 20-ти символов');
      break;
    }
    if (hashtags.indexOf(hashtag) !== hashtags.lastIndexOf(hashtag)) {
      addErrorBlock(hashtagsContainer, 'Замечены одинаковые хэштеги, разберитесь');
      break;
    }
  }

  if (descriptionContainer.value.length > MAX_DESCRIPTION_LENGTH) {
    addErrorBlock(descriptionContainer, 'Не более 140 символов');
    hasError = true;
  }

  if (hasError) {
    evt.preventDefault();
  }

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
    scaleControlSmallerContainer.removeEventListener('click', onScaleControlSmallerClick);
    scaleControlBiggerContainer.removeEventListener('click', onScaleControlBiggerClick);
    effectsListContainer.removeEventListener('change', onEffectsRadioContainersChange);
    buttonSubmitContainer.removeEventListener('click', validateForm);
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
  scaleControlSmallerContainer.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBiggerContainer.addEventListener('click', onScaleControlBiggerClick);
  effectsListContainer.addEventListener('change', onEffectsRadioContainersChange);
  buttonSubmitContainer.addEventListener('click', validateForm);
};

/**
 * Добавляет обработчик при выборе изображения для загрузки
 */
const onUploadFileChange = () => {
  uploadFileContainer.addEventListener('click', openImgUploadForm);
};


export { onUploadFileChange };
