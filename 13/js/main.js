import { getPicturesData } from './api.js';
import { printThumbnails} from './thumbnails-maker.js';
import { initGallery } from './init-gallery.js';
import { imageFormInit } from './form-handler.js';
import { printError } from './print-error.js';
import { assignFilterEvents } from './filter-handlers.js';
import { debounce } from './utils.js';

const RERENDER_DELAY = 500;
const galleryFilters = document.querySelector('.img-filters');

getPicturesData()
  .then((picturesData) => {
    printThumbnails(picturesData);
    initGallery(picturesData);

    galleryFilters.classList.remove('img-filters--inactive');

    assignFilterEvents(debounce((selectedFilter) => {
      printThumbnails(picturesData, selectedFilter);
    }, RERENDER_DELAY));
  })
  .catch(() => {
    printError();
  });

imageFormInit();
