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

const toDecimal = (percent) => percent / 100;

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export {isEscapeKey, addHidden, removeHidden, getRandomInteger, getRandomArrayElement, createIdGenerator, toDecimal, debounce};
