import {generatePhotoData} from './generate-photo-data.js';
const thumbnailsData = generatePhotoData();

const thumbnailTemplate = document.querySelector('#picture');
const thumbnailsParent = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

// Создаем и возвращаем миниатюру
const createThumbnail = ({url, description, likes, comments}) => {
  const clonedTemplate = thumbnailTemplate.cloneNode(true).content.querySelector('.picture');

  const clonedTemplateImg = clonedTemplate.querySelector('.picture__img');
  clonedTemplateImg.src = url;
  clonedTemplateImg.alt = description;
  clonedTemplate.querySelector('.picture__likes').textContent = likes;
  clonedTemplate.querySelector('.picture__comments').textContent = comments.length;

  return clonedTemplate;
};

// Добавляем все миниатюры на страницу
const printThumbnails = () => {
  for(const data of thumbnailsData) {
    fragment.append(createThumbnail(data));
  }
  thumbnailsParent.append(fragment);
};

export default printThumbnails;
