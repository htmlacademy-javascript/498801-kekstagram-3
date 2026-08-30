import { generatePhotoData } from './generate-photo-data.js';
import { printThumbnails, thumbnailsBundle } from './thumbnails-maker.js';
import { initGallery } from './gallery-handler.js';

const thumbnailsData = generatePhotoData();

printThumbnails(thumbnailsData);
initGallery(thumbnailsBundle);

