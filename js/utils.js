const DEBOUNCE_DELAY = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const addHidden = (...elements) => {
  elements.forEach((element) => {
    element.classList.add('hidden');
  });
};

const removeHidden = (...elements) => {
  elements.forEach((element) => {
    element.classList.remove('hidden');
  });
};

// Генерация случайного числа от a до b (включая a и b)
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Получение случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const toDecimal = (percent) => percent / 100;

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const setBackgroundForEach = (images, url) => {
  images.forEach((image) => {
    image.style.backgroundImage = `url(${url})`;
  });
};

export {isEscapeKey, addHidden, removeHidden, getRandomArrayElement, toDecimal, debounce, setBackgroundForEach};
