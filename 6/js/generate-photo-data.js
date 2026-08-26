import {
  PHOTO_COUNT_MAX,
  AVATAR_COUNT_MIN,
  AVATAR_COUNT_MAX,
  COMMENT_COUNT_MIN,
  COMMENT_COUNT_MAX,
  LIKE_COUNT_MIN,
  LIKE_COUNT_MAX,
  NAMES,
  SENTENCES,
  DESCRIPTIONS
} from './photo-data-initial.js';

import {
  getRandomInteger,
  getRandomArrayElement,
  createIdGenerator
} from './utils.js';

// Создаем две функции генерации уникальных идентификаторов: для фотографий и для комментариев.
const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

// Функция для создания комментария с уникальным идентификатором, случайным аватаром, сообщением и именем.
const createComment = () => {
  const commentId = generateCommentId();
  const avatarNumber = getRandomInteger(AVATAR_COUNT_MIN, AVATAR_COUNT_MAX);

  return {
    id: commentId,
    avatar: `img/avatar-${avatarNumber}.svg`,
    message: getRandomArrayElement(SENTENCES),
    name: getRandomArrayElement(NAMES)
  };
};

// Функция для генерации информации о фотографии, включая уникальный идентификатор, URL, случайное описание, случайное количество лайков и массив комментариев случайного количества.
const generatePhotoInfo = () => {
  const photoId = generatePhotoId();
  const commentsCount = getRandomInteger(COMMENT_COUNT_MIN, COMMENT_COUNT_MAX);

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKE_COUNT_MIN, LIKE_COUNT_MAX),
    comments: Array.from({length: commentsCount}, createComment)
  };
};

// Функция для генерации массива объектов с информацией о фотографиях, используя функцию generatePhotoInfo для каждого объекта.
const generatePhotoData = () => Array.from({length: PHOTO_COUNT_MAX}, generatePhotoInfo);

export {generatePhotoData};
