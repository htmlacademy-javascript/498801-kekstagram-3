import { Effects } from './effects.js';

const sliderDefault = {
  range: { min: 0, max: 100 },
  start: 100,
};
const imageUploadForm = document.querySelector('.img-upload__form');
const imagePreview = imageUploadForm.querySelector('.img-upload__preview img');
const effectsRadios = imageUploadForm.querySelectorAll('.effects__radio');
const sliderContainer = imageUploadForm.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectValueInput = sliderContainer.querySelector('.effect-level__value');

let selectedDataEffect = null;

const resetEffects = () => {
  selectedDataEffect = null;
  imagePreview.style.filter = '';
  sliderContainer.classList.add('hidden');
  effectValueInput.value = '';
};

const applyEffect = (effect) => {
  effect = effect.toString();

  if (effect === 'none') {
    resetEffects();
    return;
  }

  const effectData = Effects[effect.toUpperCase()];
  selectedDataEffect = effectData;
  sliderContainer.classList.remove('hidden');

  sliderElement.noUiSlider.updateOptions({
    range: {
      'min': effectData.min,
      'max': effectData.max
    },
    step: effectData.step,
    start: effectData.max
  });

  const filterValue = `${effectData.max}${effectData.unit}`;
  imagePreview.style.filter = `${effectData.filter}(${filterValue})`;
};

const initEffect = () => {
  sliderContainer.classList.add('hidden');
  noUiSlider.create(sliderElement, {...sliderDefault});

  sliderElement.noUiSlider.on('update', (value, handle) => {
    if(selectedDataEffect) {
      const filter = selectedDataEffect.filter;
      const choosedValue = value[handle];
      const unit = selectedDataEffect.unit;

      effectValueInput.value = Number(value[handle]);
      imagePreview.style.filter = `${filter}(${choosedValue}${unit})`;
    }
  });

  effectsRadios.forEach((radioButton) => {
    radioButton.addEventListener('change', (evt) => {
      if (evt.target.checked) {
        applyEffect(evt.target.value);
      }
    });
  });

  imageUploadForm.addEventListener('reset', resetEffects);
};

export { initEffect, resetEffects };
