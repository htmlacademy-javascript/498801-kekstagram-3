import { toDecimal } from './utils.js';

const ZOOM_STEP = 25;
const DEFAULT_ZOOM_VALUE = 100;
const MAX_ZOOM_VALUE = 100;
const MIN_ZOOM_VALUE = 25;

let zoomCurrentValue = DEFAULT_ZOOM_VALUE;

const imagePreviewContainerElement = document.querySelector('.img-upload__preview-container');
const imagePreviewElement = imagePreviewContainerElement.querySelector('.img-upload__preview img');
const inputScaleElement = imagePreviewContainerElement.querySelector('.scale__control--value');

const zoomOutButtonElement = imagePreviewContainerElement.querySelector('.scale__control--smaller');
const zoomInButtonElement = imagePreviewContainerElement.querySelector('.scale__control--bigger');

const updateValues = () => {
  inputScaleElement.value = `${zoomCurrentValue}%`;
  imagePreviewElement.style.transform = `scale(${toDecimal(zoomCurrentValue)})`;
};

const onZoomInClick = () => {
  if (zoomCurrentValue < MAX_ZOOM_VALUE) {
    zoomCurrentValue += ZOOM_STEP;
    updateValues();
  }
};

const onZoomOutClick = () => {
  if (zoomCurrentValue > MIN_ZOOM_VALUE) {
    zoomCurrentValue -= ZOOM_STEP;
    updateValues();
  }
};

const initResizeImage = () => {
  zoomOutButtonElement.addEventListener('click', onZoomOutClick);
  zoomInButtonElement.addEventListener('click', onZoomInClick);
};

const resetResize = () => {
  zoomCurrentValue = DEFAULT_ZOOM_VALUE;
  updateValues();
};

export { initResizeImage, resetResize };
