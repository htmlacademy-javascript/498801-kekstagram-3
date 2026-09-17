const Filter = {
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};
const filtersFormElement = document.querySelector('.img-filters__form');

const assignFilterEvents = (callback) => {
  filtersFormElement.addEventListener('click', (evt) => {
    const currentButtonElement = filtersFormElement.querySelector('.img-filters__button--active');
    const activeButtonElement = evt.target.closest('.img-filters__button');

    if (!activeButtonElement || activeButtonElement === currentButtonElement) {
      return;
    }

    currentButtonElement?.classList.remove('img-filters__button--active');
    activeButtonElement.classList.add('img-filters__button--active');

    const filterType = activeButtonElement.id.replace('filter-', '');
    callback(filterType);
  });
};

export { assignFilterEvents, Filter };
