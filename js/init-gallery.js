import { showPicture } from './render-big-picture.js';

// Функция отслеживания кликов на миниатюры
const initGallery = (thumbnails) => {
  const picturesContainerElement = document.querySelector('.pictures');

  picturesContainerElement.addEventListener('click', (evt) => {
    const currentPictureElement = evt.target.closest('.picture');

    if (currentPictureElement) {
      evt.preventDefault();

      const pictureId = Number(currentPictureElement.dataset.id);
      const targetPictureData = thumbnails.find((thumbnail) => thumbnail.id === pictureId);

      if(targetPictureData) {
        showPicture(targetPictureData);
      }
    }
  });
};

export { initGallery };
