import { initModal } from './init-modal.js';
import { isEscapeKey } from './utils.js';
import { initResizeImage, resetResize } from './init-resize.js';
import { initEffect, resetEffects } from './init-effect.js';
import { sendPicturesData } from './api.js';
import { showMessage } from './show-message.js';

const IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'];
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const Status = {
  SUCCESS: 'success',
  ERROR: 'error'
};

const imageForm = document.querySelector('.img-upload__form');
const imageInput = imageForm.querySelector('.img-upload__input');
const hashtagInput = imageForm.querySelector('.text__hashtags');
const descriptionInput = imageForm.querySelector('.text__description');
const submitButton = imageForm.querySelector('.img-upload__submit');
const imagePreview = imageForm.querySelector('.img-upload__preview img');
let hideModal = null;
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

const onKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function clearForm () {
  imageForm.reset();
  pristine.reset();
  resetEffects();
  resetResize();
  if (imageInput) {
    imageInput.value = '';
  }

  hashtagInput.removeEventListener('keydown', onKeydown);
  descriptionInput.removeEventListener('keydown', onKeydown);
}

const onImageInputChange = () => {
  const image = imageInput.files[0];

  if (!image) {
    return;
  }

  const imageName = image.name.toLowerCase();
  const matches = IMAGE_TYPES.some((type) => imageName.endsWith(type));

  if (matches) {
    imagePreview.src = URL.createObjectURL(image);
  }

  const uploadOverlay = imageForm.querySelector('.img-upload__overlay');
  const closeButton = imageForm.querySelector('.cancel');

  hashtagInput.addEventListener('keydown', onKeydown);
  descriptionInput.addEventListener('keydown', onKeydown);

  hideModal = initModal(uploadOverlay, closeButton, clearForm).hideModal;
};

const onSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    submitButton.disabled = true;

    sendPicturesData(formData)
      .then(() => {
        clearForm();
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
        submitButton.disabled = false;
      });
  }
};

const imageFormInit = () => {
  if (imageForm) {
    imageForm.addEventListener('submit', onSubmit);
    imageInput.addEventListener('change', onImageInputChange);
    initResizeImage();
    initEffect();
  }
};

export { imageFormInit };
