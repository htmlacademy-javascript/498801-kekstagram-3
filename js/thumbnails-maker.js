const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsParent = document.querySelector('.pictures');

// Создаем и возвращаем миниатюру
const createThumbnail = ({url, description, likes, comments}) => {
  const clonedTemplate = thumbnailTemplate.cloneNode(true);

  const clonedTemplateImg = clonedTemplate.querySelector('.picture__img');
  clonedTemplateImg.src = url;
  clonedTemplateImg.alt = description;
  clonedTemplate.querySelector('.picture__likes').textContent = likes;
  clonedTemplate.querySelector('.picture__comments').textContent = comments.length;

  return clonedTemplate;
};

// Возвращает два метода: добавить связку элемент-данные и вернуть массив со связками
const buildPicturesBundle = () => {
  const picturesBundle = [];

  return {
    addPictures: (pictureData, pictureElement) => {
      picturesBundle.push([pictureData, pictureElement]);
    },
    getBundle: () => picturesBundle
  };
};
const buildBundle = buildPicturesBundle();

// Добавляем все миниатюры на страницу
const printThumbnails = (thumbnailsData) => {
  const fragment = document.createDocumentFragment();

  thumbnailsData.forEach((pictureData) => {
    const picture = createThumbnail(pictureData);
    // Сохраним связку картинки и обьекта с данными
    buildBundle.addPictures(pictureData, picture);
    fragment.append(picture);
  });

  thumbnailsParent.append(fragment);
};

const thumbnailsBundle = buildBundle.getBundle();
export { printThumbnails, thumbnailsBundle };
