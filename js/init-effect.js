import { Effect } from './effects.js';

const SLIDER_DEFAULT = {
  range: { min: 0, max: 100 },
  start: 100,
};
const imageUploadFormElement = document.querySelector('.img-upload__form');
const imagePreviewElement = imageUploadFormElement.querySelector('.img-upload__preview img');
const effectsListElement = imageUploadFormElement.querySelector('.effects__list');
const sliderContainerElement = imageUploadFormElement.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');
const effectValueInputElement = sliderContainerElement.querySelector('.effect-level__value');

let selectedDataEffect = null;

const resetEffects = () => {
  selectedDataEffect = null;
  imagePreviewElement.style.filter = '';
  sliderContainerElement.classList.add('hidden');
  effectValueInputElement.value = '';
};

const applyEffect = (effect) => {
  if (effect === 'none') {
    resetEffects();
    return;
  }

  const effectData = Effect[effect.toUpperCase()];
  selectedDataEffect = effectData;
  sliderContainerElement.classList.remove('hidden');

  sliderElement.noUiSlider.updateOptions({
    range: {
      'min': effectData.min,
      'max': effectData.max
    },
    step: effectData.step,
    start: effectData.max
  });

  const filterValue = `${effectData.max}${effectData.unit}`;
  imagePreviewElement.style.filter = `${effectData.filter}(${filterValue})`;
};

const initEffect = () => {
  sliderContainerElement.classList.add('hidden');
  noUiSlider.create(sliderElement, {...SLIDER_DEFAULT, connect: 'lower'});

  sliderElement.noUiSlider.on('update', (value, handle) => {
    if(selectedDataEffect) {
      const filter = selectedDataEffect.filter;
      const chosenValue = value[handle];
      const unit = selectedDataEffect.unit;

      effectValueInputElement.value = Number(value[handle]);
      imagePreviewElement.style.filter = `${filter}(${chosenValue}${unit})`;
    }
  });

  effectsListElement.addEventListener('change', (evt) => {
    applyEffect(evt.target.value);
  });
};

export { initEffect, resetEffects };
