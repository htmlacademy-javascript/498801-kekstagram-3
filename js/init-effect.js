import { EFFECTS } from './effects.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imagePreview = imageUploadForm.querySelector('.img-upload__preview img');
const effectsRadios = imageUploadForm.querySelectorAll('.effects__radio');
const sliderContainer = imageUploadForm.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectValueInput = sliderContainer.querySelector('.effect-level__value');

let selectedDataEffect = null;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
});

sliderElement.noUiSlider.on('update', (value, handle) => {
  if(selectedDataEffect) {
    const filter = selectedDataEffect.filter;
    const choosedValue = value[handle];
    const unit = selectedDataEffect.unit;

    effectValueInput.value = Number(value[handle]);
    imagePreview.style.filter = `${filter}(${choosedValue}${unit})`;
  }
});

const applyEffect = (effect) => {
  effect = effect.toString();

  if (effect === 'none') {
    imagePreview.style.filter = effect;
    selectedDataEffect = null;
    effectValueInput.value = '';
    if (!sliderContainer.classList.contains('hidden')) {
      sliderContainer.classList.add('hidden');
    }
    return;
  }

  const effectData = EFFECTS[effect.toUpperCase()];
  selectedDataEffect = effectData;

  if (sliderContainer.classList.contains('hidden')) {
    sliderContainer.classList.remove('hidden');
  }

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

  effectsRadios.forEach((radioButton) => {
    radioButton.addEventListener('change', (evt) => {
      if (evt.target.checked) {
        applyEffect(evt.target.value);
      }
    });
  });

  imageUploadForm.addEventListener('reset', () => {
    selectedDataEffect = null;
    imagePreview.style.filter = '';
    if (!sliderContainer.classList.contains('hidden')) {
      sliderContainer.classList.add('hidden');
    }
  });
};

export { initEffect };
