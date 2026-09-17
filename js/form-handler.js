import { initModal } from './init-modal.js';
import { isEscapeKey, setBackgroundForEach } from './utils.js';
import { initResizeImage, resetResize } from './init-resize.js';
import { initEffect, resetEffects } from './init-effect.js';
import { sendPicturesData } from './api.js';
import { showMessage } from './show-message.js';

const IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'];
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const DEFAULT_IMAGE_SRC = 'img/upload-default-image.jpg';
const Status = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const imageFormElement = document.querySelector('.img-upload__form');
const imageInputElement = imageFormElement.querySelector('.img-upload__input');
const hashtagInputElement = imageFormElement.querySelector('.text__hashtags');
const descriptionInputElement = imageFormElement.querySelector('.text__description');
const submitButtonElement = imageFormElement.querySelector('.img-upload__submit');
const uploadOverlayElement = imageFormElement.querySelector('.img-upload__overlay');
const closeButtonElement = imageFormElement.querySelector('.cancel');
const imagePreviewElement = imageFormElement.querySelector('.img-upload__preview img');
const thumbnailPreviewElements = imageFormElement.querySelectorAll('.effects__preview');
let hideModal = null;
let errorHashtagsMessage = '';
let errorCommentMessage = '';
let imagePreviewSrc = DEFAULT_IMAGE_SRC;

const pristine = new Pristine(imageFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

const validateHashtags = (value) => {
  errorHashtagsMessage = '';
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return true;
  }

  const tags = trimmedValue.split(/\s+/);

  if (tags.length > MAX_HASHTAGS_COUNT) {
    errorHashtagsMessage = 'Превышено количество хэштегов';
    return false;
  }

  const lowerTags = tags.map((tag) => tag.toLowerCase());

  const hasError = tags.some((tag, index) => {
    const tagWithoutHash = tag.slice(1);

    if (!tag.startsWith('#')) {
      errorHashtagsMessage = 'Хэштег должен начинаться с #';
      return true;
    }

    if (tagWithoutHash === '') {
      errorHashtagsMessage = 'Не найдено имя хэштега';
      return true;
    }

    if (!/^[a-zA-Zа-яёА-Я0-9]+$/.test(tagWithoutHash)) {
      errorHashtagsMessage = 'Хэштег содержит недопустимые символы';
      return true;
    }

    if (tag.length > MAX_HASHTAG_LENGTH) {
      errorHashtagsMessage = 'Слишком длинный хэштег';
      return true;
    }

    if (lowerTags.indexOf(tag.toLowerCase()) !== index) {
      errorHashtagsMessage = 'Найден повторяющийся хэштег';
      return true;
    }

    return false;
  });

  return !hasError;
};

const validateComment = (value) => {
  errorCommentMessage = '';
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return true;
  }

  if(value.length > MAX_COMMENT_LENGTH) {
    errorCommentMessage = 'Слишком много символов';
    return false;
  }

  return true;
};

const getHashtagsError = () => errorHashtagsMessage || 'Некорректные данные';
const getCommentError = () => errorCommentMessage || 'Некорректные данные';

pristine.addValidator(hashtagInputElement, validateHashtags, getHashtagsError);
pristine.addValidator(descriptionInputElement, validateComment, getCommentError);

const onTextInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const clearForm = () => {
  imageFormElement.reset();
  pristine.reset();
  resetEffects();
  resetResize();
  URL.revokeObjectURL(imagePreviewSrc);
  imagePreviewSrc = DEFAULT_IMAGE_SRC;
  imagePreviewElement.src = imagePreviewSrc;
  imageInputElement.value = '';

  setBackgroundForEach(thumbnailPreviewElements, imagePreviewSrc);

  hashtagInputElement.removeEventListener('keydown', onTextInputKeydown);
  descriptionInputElement.removeEventListener('keydown', onTextInputKeydown);
};

const onImageInputChange = () => {
  const image = imageInputElement.files[0];

  if (!image) {
    return;
  }

  const imageName = image.name.toLowerCase();
  const matches = IMAGE_TYPES.some((type) => imageName.endsWith(type));

  if (matches) {
    imagePreviewSrc = URL.createObjectURL(image);
    imagePreviewElement.src = imagePreviewSrc;

    setBackgroundForEach(thumbnailPreviewElements, imagePreviewSrc);

    hashtagInputElement.addEventListener('keydown', onTextInputKeydown);
    descriptionInputElement.addEventListener('keydown', onTextInputKeydown);

    hideModal = initModal(uploadOverlayElement, closeButtonElement, clearForm).hideModal;
  }
};

const onImageFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    submitButtonElement.disabled = true;

    sendPicturesData(formData)
      .then(() => {
        if (hideModal) {
          hideModal();
          hideModal = null;
        }
        showMessage(Status.SUCCESS);
      })
      .catch(() => {
        showMessage(Status.ERROR);
      })
      .finally(() => {
        submitButtonElement.disabled = false;
      });
  }
};

const initImageForm = () => {
  imageFormElement.addEventListener('submit', onImageFormSubmit);
  imageInputElement.addEventListener('change', onImageInputChange);
  initResizeImage();
  initEffect();
};

export { initImageForm };
