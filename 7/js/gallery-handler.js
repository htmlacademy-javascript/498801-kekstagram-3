import { showPicture } from './renderBigPicture.js';

// Функция отслеживания кликов на миниатюры
const initGallery = (picturesBundle) => {
  const picturesContainer = document.querySelector('.pictures');

  picturesContainer.addEventListener('click', (evt) => {
    evt.preventDefault();
    const currentPicture = evt.target.closest('.picture');

    if (currentPicture) {
      picturesBundle.forEach((pictureData) => {
        const [pictureProperties, picture] = pictureData;

        if (picture === currentPicture) {
          showPicture(pictureProperties);
        }
      });
    }
  });
};

export { initGallery };
