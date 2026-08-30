import { isEscapeKey, addHidden, removeHidden } from './utils.js';

const COMMENT_AVATAR_WIDTH = 35;
const COMMENT_AVATAR_HEIGHT = 35;

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

const printComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const fillComment = createComment(comment.avatar, comment.name, comment.message);
    commentsFragment.append(fillComment);
  });

  commentsContainer.append(commentsFragment);
};

const fillPicture = (pictureData) => {
  pictureImg.src = pictureData.url;
  pictureImg.alt = pictureData.description;
  likesCountElement.textContent = pictureData.likes;
  commentsVisibleCountElement.textContent = pictureData.comments.length;
  commentsTotalCountElement.textContent = pictureData.comments.length;
  pictureCaption.textContent = pictureData.description;

  commentsContainer.innerHTML = '';
  printComments(pictureData.comments);
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
  removeHidden(commentsCountElement, commentsLoader);
  closePictureModal.removeEventListener('click', onCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Отображаем картинку после клика
const showPicture = (pictureProperties) => {
  fillPicture(pictureProperties);
  removeHidden(pictureModal);
  addHidden(commentsCountElement, commentsLoader);
  body.classList.add('modal-open');

  closePictureModal.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { showPicture };
