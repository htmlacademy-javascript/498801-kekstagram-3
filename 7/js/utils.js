const isEscapeKey = (evt) => evt.key === 'Escape';

const addHidden = (...elements) => {
  elements.forEach((element) => {
    if (element) {
      element.classList.add('hidden');
    }
  });
};

const removeHidden = (...elements) => {
  elements.forEach((element) => {
    if (element) {
      element.classList.remove('hidden');
    }
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

// Функция для генерации уникальных идентификаторов с замыканием.
// Каждый раз при вызове возвращаемой функции -> возвращает новый уникальный идентификатор, начиная с 1 и увеличивая на 1 при каждом вызове.
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

export {isEscapeKey, addHidden, removeHidden, getRandomInteger, getRandomArrayElement, createIdGenerator};
