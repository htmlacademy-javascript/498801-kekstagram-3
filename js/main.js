import { generatePhotoData } from './generate-photo-data.js';
import { printThumbnails, thumbnailsBundle } from './thumbnails-maker.js';
import { initGalleryListeners } from './gallery-handler.js';

const thumbnailsData = generatePhotoData();

printThumbnails(thumbnailsData);
initGalleryListeners(thumbnailsBundle);

