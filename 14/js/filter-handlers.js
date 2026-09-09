const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('.img-filters__button');

const Filter = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const assignFilterEvents = (callback) => {
  filtersForm.addEventListener('click', (evt) => {
    const activeButton = evt.target.closest('.img-filters__button');

    if (!activeButton) {
      return;
    }

    filterButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });

    activeButton.classList.add('img-filters__button--active');

    const filterType = activeButton.id.replace('filter-', '');
    callback(filterType);
  });
};

export { assignFilterEvents, Filter };
