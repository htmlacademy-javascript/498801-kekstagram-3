import { addHidden, removeHidden } from './utils.js';
import { initModal } from './init-modal.js';

const COMMENT_AVATAR_WIDTH = 35;
const COMMENT_AVATAR_HEIGHT = 35;
const COMMENT_STEP_COUNT = 5;

let commentsCounter = COMMENT_STEP_COUNT;
let pictureComments = [];
const pictureModalElement = document.querySelector('.big-picture');
const pictureImgElement = pictureModalElement.querySelector('.big-picture__img img');
const closeButtonElement = pictureModalElement.querySelector('.cancel');
const likesCountElement = pictureModalElement.querySelector('.likes-count');
const commentsCountElement = pictureModalElement.querySelector('.social__comment-count');
const commentsTotalCountElement = commentsCountElement.querySelector('.social__comment-total-count');
const commentsVisibleCountElement = commentsCountElement.querySelector('.social__comment-shown-count');
const commentsContainerElement = pictureModalElement.querySelector('.social__comments');
const commentsLoaderElement = pictureModalElement.querySelector('.comments-loader');
const pictureCaptionElement = pictureModalElement.querySelector('.social__caption');

// Создаем комментарий
const createComment = (avatarSrc, name, message) => {
  const commentItemElement = document.createElement('li');
  const avatarImageElement = document.createElement('img');
  commentItemElement.classList.add('social__comment');
  avatarImageElement.classList.add('social__picture');
  avatarImageElement.src = avatarSrc;
  avatarImageElement.alt = name;
  avatarImageElement.width = COMMENT_AVATAR_WIDTH;
  avatarImageElement.height = COMMENT_AVATAR_HEIGHT;

  const messageContainerElement = document.createElement('p');
  messageContainerElement.classList.add('social__text');
  messageContainerElement.textContent = message;

  commentItemElement.append(avatarImageElement, messageContainerElement);
  return commentItemElement;
};

const printComments = () => {
  const commentsFragmentElement = document.createDocumentFragment();
  const commentCount = Math.min(pictureComments.length, commentsCounter);
  const visibleComments = pictureComments.slice(0, commentCount);

  commentsVisibleCountElement.textContent = visibleComments.length;

  if (visibleComments.length === pictureComments.length) {
    addHidden(commentsLoaderElement);
  } else {
    removeHidden(commentsLoaderElement);
  }

  commentsContainerElement.innerHTML = '';

  visibleComments.forEach((comment) => {
    const fillComment = createComment(comment.avatar, comment.name, comment.message);
    commentsFragmentElement.append(fillComment);
  });

  commentsContainerElement.append(commentsFragmentElement);
};

const fillPicture = (pictureData) => {
  pictureImgElement.src = pictureData.url;
  pictureImgElement.alt = pictureData.description;
  likesCountElement.textContent = pictureData.likes;
  commentsTotalCountElement.textContent = pictureData.comments.length;
  pictureCaptionElement.textContent = pictureData.description;

  printComments();
};

// Отображаем картинку после клика
const showPicture = (pictureProperties) => {
  commentsCounter = COMMENT_STEP_COUNT;
  pictureComments = pictureProperties.comments;
  fillPicture(pictureProperties);

  initModal(pictureModalElement, closeButtonElement);
};

commentsLoaderElement.addEventListener('click', () => {
  commentsCounter += COMMENT_STEP_COUNT;
  printComments();
});

export { showPicture };
