import { showPicture } from './render-big-picture.js';

// Функция отслеживания кликов на миниатюры
const initGallery = (thumbnails) => {
  const picturesContainer = document.querySelector('.pictures');

  picturesContainer.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');

    if (currentPicture) {
      evt.preventDefault();

      const pictureId = Number(currentPicture.dataset.id);
      const targetPictureData = thumbnails.find((thumbnail) => thumbnail.id === pictureId);

      if(targetPictureData) {
        showPicture(targetPictureData);
      }
    }
  });
};

export { initGallery };
