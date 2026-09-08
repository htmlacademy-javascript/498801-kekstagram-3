const filtersForm = document.querySelector('.img-filters__form');
const Filter = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const assignFilterEvents = (callback) => {
  filtersForm.addEventListener('click', (evt) => {
    if (evt.target.closest('#filter-default')) {
      callback(Filter.DEFAULT);
    }

    if (evt.target.closest('#filter-random')) {
      callback(Filter.RANDOM);
    }

    if (evt.target.closest('#filter-discussed')) {
      callback(Filter.DISCUSSED);
    }
  });
};

export { assignFilterEvents, Filter };
