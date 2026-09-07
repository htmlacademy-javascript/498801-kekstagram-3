import { getPicturesData } from './api.js';
import { printThumbnails} from './thumbnails-maker.js';
import { initGallery } from './init-gallery.js';
import { imageFormInit } from './form-handler.js';
import { printError } from './print-error.js';

getPicturesData()
  .then((picturesData) => {
    printThumbnails(picturesData);
    initGallery(picturesData);
  })
  .catch(() => {
    printError();
  });

imageFormInit();
