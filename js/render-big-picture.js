import { addHidden, removeHidden } from './utils.js';
import { initModal } from './init-modal.js';

const COMMENT_AVATAR_WIDTH = 35;
const COMMENT_AVATAR_HEIGHT = 35;
const COMMENT_STEP_COUNT = 5;

let commentsCounter = COMMENT_STEP_COUNT;
let pictureComments = [];
const pictureModal = document.querySelector('.big-picture');
const pictureImg = pictureModal.querySelector('.big-picture__img img');
const closeButton = pictureModal.querySelector('.cancel');
const likesCountElement = pictureModal.querySelector('.likes-count');
const commentsCountElement = pictureModal.querySelector('.social__comment-count');
const commentsTotalCountElement = commentsCountElement.querySelector('.social__comment-total-count');
const commentsVisibleCountElement = commentsCountElement.querySelector('.social__comment-shown-count');
const commentsContainer = pictureModal.querySelector('.social__comments');
const commentsLoader = pictureModal.querySelector('.comments-loader');
const pictureCaption = pictureModal.querySelector('.social__caption');

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
  const commentCount = Math.min(pictureComments.length, commentsCounter);
  const visibledComments = pictureComments.slice(0, commentCount);

  commentsVisibleCountElement.textContent = visibledComments.length;

  if (visibledComments.length === pictureComments.length) {
    addHidden(commentsLoader);
  } else {
    removeHidden(commentsLoader);
  }

  commentsContainer.innerHTML = '';

  visibledComments.forEach((comment) => {
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

// Отображаем картинку после клика
const showPicture = (pictureProperties) => {
  commentsCounter = COMMENT_STEP_COUNT;
  pictureComments = pictureProperties.comments;
  fillPicture(pictureProperties);

  initModal(pictureModal, closeButton);
};

commentsLoader.addEventListener('click', () => {
  commentsCounter += COMMENT_STEP_COUNT;
  printComments();
});

export { showPicture };
