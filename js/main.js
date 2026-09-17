import { initImageForm } from './form-handler.js';
import { getPicturesData } from './api.js';
import { printThumbnails} from './thumbnails-maker.js';
import { initGallery } from './init-gallery.js';
import { printError } from './print-error.js';
import { assignFilterEvents } from './filter-handlers.js';
import { debounce } from './utils.js';

const RERENDER_DELAY = 500;
const galleryFiltersElement = document.querySelector('.img-filters');

initImageForm();

getPicturesData()
  .then((picturesData) => {
    printThumbnails(picturesData);
    initGallery(picturesData);

    galleryFiltersElement.classList.remove('img-filters--inactive');

    assignFilterEvents(debounce((selectedFilter) => {
      printThumbnails(picturesData, selectedFilter);
    }, RERENDER_DELAY));
  })
  .catch(() => {
    printError();
  });
