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

// Добавляем все миниатюры на страницу
const printThumbnails = (thumbnailsData) => {
  const fragment = document.createDocumentFragment();

  thumbnailsData.forEach((pictureData) => {
    const picture = createThumbnail(pictureData);
    fragment.append(picture);
  });

  thumbnailsParent.append(fragment);
};

export { printThumbnails};
