import { initModal } from './init-modal.js';
import { isEscapeKey } from './utils.js';
import { initResizeImage } from './init-resize.js';
import { initEffect } from './init-effect.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const imageForm = document.querySelector('.img-upload__form');
const imageInput = imageForm.querySelector('.img-upload__input');
const hashtagInput = imageForm.querySelector('.text__hashtags');
const descriptionInput = imageForm.querySelector('.text__description');
let errorHashtagsMessage = '';
let errorCommentMessage = '';

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

const validateHashtags = (value) => {
  errorHashtagsMessage = '';
  const errors = [];
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return true;
  }

  const tags = trimmedValue.split(/\s+/);

  if (tags.length > MAX_HASHTAGS_COUNT) {
    errors.push('Превышено количество');
  }

  const lowerTags = tags.map((tag) => tag.toLowerCase());

  tags.forEach((tag, index) => {
    if (!tag.startsWith('#')) {
      errors.push(`${tag} должен начинаться с #`);
    }

    const tagWithoutHash = tag.slice(1);
    if (!/^[a-zA-Zа-яёА-Я0-9]+$/.test(tagWithoutHash)) {
      errors.push(`${tag} содержит недопустимые символы`);
    }

    if (tagWithoutHash === '') {
      errors.push('Не найдено имя хэштега');
    }

    if (tag.length > MAX_HASHTAG_LENGTH) {
      errors.push(`Слишком длинный хэштег ${tag}`);
    }

    if (lowerTags.indexOf(tag.toLowerCase()) !== index) {
      errors.push(`Найден повторяющийся хэштег ${tag}`);
    }
  });

  if(errors.length > 0) {
    errorHashtagsMessage = errors.join(', ');
    return false;
  }

  return true;
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

pristine.addValidator(hashtagInput, validateHashtags, getHashtagsError);
pristine.addValidator(descriptionInput, validateComment, getCommentError);


const onSubmitClick = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    imageForm.submit();
  }
};

const onKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onImageInputChange = () => {
  const image = imageInput.files[0];

  if (!image) {
    return;
  }

  const imagePreview = imageForm.querySelector('.img-upload__preview img');
  const uploadOverlay = imageForm.querySelector('.img-upload__overlay');
  const closeButton = imageForm.querySelector('.cancel');
  const imageUrl = URL.createObjectURL(image);

  imagePreview.src = imageUrl;

  hashtagInput.addEventListener('keydown', onKeydown);
  descriptionInput.addEventListener('keydown', onKeydown);

  initModal(uploadOverlay, closeButton, clearForm);
};

function clearForm () {
  imageForm.reset();
  pristine.reset();
  if (imageInput) {
    imageInput.value = '';
  }

  hashtagInput.removeEventListener('keydown', onKeydown);
  descriptionInput.removeEventListener('keydown', onKeydown);
}

const imageFormInit = () => {
  if (imageForm) {
    imageForm.addEventListener('submit', onSubmitClick);
    imageInput.addEventListener('change', onImageInputChange);
    initResizeImage();
    initEffect();
  }
};

export { imageFormInit };
