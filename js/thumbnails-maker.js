import { Filter } from './filter-handlers.js';
import { getRandomArrayElement } from './utils.js';

const RANDOM_PICTURES_COUNT = 10;

const thumbnailTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsParentElement = document.querySelector('.pictures');

// Создаем и возвращаем миниатюру
const createThumbnail = ({id, url, description, likes, comments}) => {
  const clonedTemplateElement = thumbnailTemplateElement.cloneNode(true);
  clonedTemplateElement.dataset.id = id;

  const clonedTemplateImgElement = clonedTemplateElement.querySelector('.picture__img');
  clonedTemplateImgElement.src = url;
  clonedTemplateImgElement.alt = description;
  clonedTemplateElement.querySelector('.picture__likes').textContent = likes;
  clonedTemplateElement.querySelector('.picture__comments').textContent = comments.length;

  return clonedTemplateElement;
};

const getRandomPictures = (pictures, count) => {
  const availableCount = Math.min(count, pictures.length);
  const randomPictures = [];

  for (let i = 0; i < availableCount; i++) {
    let randomElement = getRandomArrayElement(pictures);
    while (randomPictures.includes(randomElement)) {
      randomElement = getRandomArrayElement(pictures);
    }
    randomPictures.push(randomElement);
  }

  return randomPictures;
};

// Добавляем все миниатюры на страницу
const printThumbnails = (thumbnailsData, state) => {
  const pictureElements = thumbnailsParentElement.querySelectorAll('.picture');
  pictureElements.forEach((picture) => picture.remove());

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

  const fragmentElement = document.createDocumentFragment();

  similarThumbnailsData.forEach((pictureData) => {
    const pictureElement = createThumbnail(pictureData);
    fragmentElement.append(pictureElement);
  });

  thumbnailsParentElement.append(fragmentElement);
};

export { printThumbnails};
