import { Filter } from './filter-handlers.js';
import { getRandomArrayElement } from './utils.js';

const RANDOM_PICTURES_COUNT = 10;

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsParent = document.querySelector('.pictures');

// Создаем и возвращаем миниатюру
const createThumbnail = ({id, url, description, likes, comments}) => {
  const clonedTemplate = thumbnailTemplate.cloneNode(true);
  clonedTemplate.dataset.id = id;

  const clonedTemplateImg = clonedTemplate.querySelector('.picture__img');
  clonedTemplateImg.src = url;
  clonedTemplateImg.alt = description;
  clonedTemplate.querySelector('.picture__likes').textContent = likes;
  clonedTemplate.querySelector('.picture__comments').textContent = comments.length;

  return clonedTemplate;
};

const getRandomPictures = (pictures, count) => {
  const availableCount = Math.min(count, pictures.length);
  const result = [];

  for (let i = 0; i < availableCount; i++) {
    let randomElement = getRandomArrayElement(pictures);
    while (result.includes(randomElement)) {
      randomElement = getRandomArrayElement(pictures);
    }
    result.push(randomElement);
  }

  return result;
};

// Добавляем все миниатюры на страницу
const printThumbnails = (thumbnailsData, state) => {
  const pictures = thumbnailsParent.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());

  let similarThumbnailsData;

  switch (state) {
    case Filter.RANDOM:
      similarThumbnailsData = getRandomPictures(thumbnailsData, RANDOM_PICTURES_COUNT);
      break;
    case Filter.DISCUSSED:
      similarThumbnailsData = thumbnailsData.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      similarThumbnailsData = thumbnailsData;
  }

  const fragment = document.createDocumentFragment();

  similarThumbnailsData.forEach((pictureData) => {
    const picture = createThumbnail(pictureData);
    fragment.append(picture);
  });

  thumbnailsParent.append(fragment);
};

export { printThumbnails};
