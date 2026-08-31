import { isEscapeKey, addHidden, removeHidden } from './utils.js';

const COMMENT_AVATAR_WIDTH = 35;
const COMMENT_AVATAR_HEIGHT = 35;
const COMMENT_STEP_COUNT = 5;

let commentsCounter = COMMENT_STEP_COUNT;
let pictureComments = [];
const body = document.body;
const pictureModal = document.querySelector('.big-picture');
const pictureImg = pictureModal.querySelector('.big-picture__img img');
const likesCountElement = pictureModal.querySelector('.likes-count');
const commentsCountElement = pictureModal.querySelector('.social__comment-count');
const commentsTotalCountElement = commentsCountElement.querySelector('.social__comment-total-count');
const commentsVisibleCountElement = commentsCountElement.querySelector('.social__comment-shown-count');
const commentsContainer = pictureModal.querySelector('.social__comments');
const commentsLoader = pictureModal.querySelector('.comments-loader');
const pictureCaption = pictureModal.querySelector('.social__caption');
const closePictureModal = pictureModal.querySelector('.big-picture__cancel');

// Создаем комментарий
const createComment = (avatarSrc, name, message) => {
  const li = document.createElement('li');
  const img = document.createElement('img');
  li.classList.add('social__comment');
  img.classList.add('social__picture');
  img.src = avatarSrc;
  img.alt = name;
  img.width = COMMENT_AVATAR_WIDTH;
  img.height = COMMENT_AVATAR_HEIGHT;

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = message;

  li.append(img, p);
  return li;
};

const printComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const commentCount = pictureComments.length < commentsCounter ? pictureComments.length : commentsCounter;
  const commentsVisibled = pictureComments.slice(0, commentCount);

  commentsVisibleCountElement.textContent = commentsVisibled.length;

  if (commentsVisibled.length === Number(commentsTotalCountElement.textContent)) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentsContainer.innerHTML = '';

  commentsVisibled.forEach((comment) => {
    const fillComment = createComment(comment.avatar, comment.name, comment.message);
    commentsFragment.append(fillComment);
  });

  commentsContainer.append(commentsFragment);
};

const fillPicture = (pictureData) => {
  pictureImg.src = pictureData.url;
  pictureImg.alt = pictureData.description;
  likesCountElement.textContent = pictureData.likes;
  commentsTotalCountElement.textContent = pictureData.comments.length;
  pictureCaption.textContent = pictureData.description;

  printComments();
};

// Обработчики способов закрытия картинки
const onCloseClick = () => {
  hidePicture();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePicture();
  }
};

// Скрываем картинку
function hidePicture () {
  addHidden(pictureModal);
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Отображаем картинку после клика
const showPicture = (pictureProperties) => {
  commentsCounter = COMMENT_STEP_COUNT;
  pictureComments = pictureProperties.comments;
  fillPicture(pictureProperties);
  removeHidden(pictureModal);
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

closePictureModal.addEventListener('click', onCloseClick);

commentsLoader.addEventListener('click', () => {
  commentsCounter += COMMENT_STEP_COUNT;
  printComments();
});

export { showPicture };
