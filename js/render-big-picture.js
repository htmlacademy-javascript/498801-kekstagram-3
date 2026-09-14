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
const commentsCount = pictureModal.querySelector('.social__comment-count');
const commentsTotalCount = commentsCount.querySelector('.social__comment-total-count');
const commentsVisibleCount = commentsCount.querySelector('.social__comment-shown-count');
const commentsContainer = pictureModal.querySelector('.social__comments');
const commentsLoader = pictureModal.querySelector('.comments-loader');
const pictureCaption = pictureModal.querySelector('.social__caption');

// Создаем комментарий
const createComment = (avatarSrc, name, message) => {
  const commentItem = document.createElement('li');
  const avatarImage = document.createElement('img');
  commentItem.classList.add('social__comment');
  avatarImage.classList.add('social__picture');
  avatarImage.src = avatarSrc;
  avatarImage.alt = name;
  avatarImage.width = COMMENT_AVATAR_WIDTH;
  avatarImage.height = COMMENT_AVATAR_HEIGHT;

  const messageContainer = document.createElement('p');
  messageContainer.classList.add('social__text');
  messageContainer.textContent = message;

  commentItem.append(avatarImage, messageContainer);
  return commentItem;
};

const printComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const commentCount = Math.min(pictureComments.length, commentsCounter);
  const visibleComments = pictureComments.slice(0, commentCount);

  commentsVisibleCount.textContent = visibleComments.length;

  if (visibleComments.length === pictureComments.length) {
    addHidden(commentsLoader);
  } else {
    removeHidden(commentsLoader);
  }

  commentsContainer.innerHTML = '';

  visibleComments.forEach((comment) => {
    const fillComment = createComment(comment.avatar, comment.name, comment.message);
    commentsFragment.append(fillComment);
  });

  commentsContainer.append(commentsFragment);
};

const fillPicture = (pictureData) => {
  pictureImg.src = pictureData.url;
  pictureImg.alt = pictureData.description;
  likesCountElement.textContent = pictureData.likes;
  commentsTotalCount.textContent = pictureData.comments.length;
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
