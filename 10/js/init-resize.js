import { toDecimal } from './utils.js';

const ZOOM_STEP = 25;
const DEFAULT_ZOOM_VALUE = 100;
const MAX_ZOOM_VALUE = 100;
const MIN_ZOOM_VALUE = 25;

let zoomCurrentValue = DEFAULT_ZOOM_VALUE;

const imagePreviewContainer = document.querySelector('.img-upload__preview-container');
const imagePreview = imagePreviewContainer.querySelector('.img-upload__preview img');
const inputScale = imagePreviewContainer.querySelector('.scale__control--value');

const zoomOutButton = imagePreviewContainer.querySelector('.scale__control--smaller');
const zoomInButton = imagePreviewContainer.querySelector('.scale__control--bigger');

const updateValues = () => {
  inputScale.value = `${zoomCurrentValue}%`;
  imagePreview.style.transform = `scale(${toDecimal(zoomCurrentValue)})`;
};

const zoomIn = () => {
  if (zoomCurrentValue < MAX_ZOOM_VALUE) {
    zoomCurrentValue += ZOOM_STEP;
    updateValues();
  }
};

const zoomOut = () => {
  if (zoomCurrentValue > MIN_ZOOM_VALUE) {
    zoomCurrentValue -= ZOOM_STEP;
    updateValues();
  }
};

const initResizeImage = () => {
  zoomOutButton.addEventListener('click', zoomOut);
  zoomInButton.addEventListener('click', zoomIn);
};

export { initResizeImage };
