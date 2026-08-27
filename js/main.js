import { generatePhotoData } from './generate-photo-data.js';
import { printThumbnails } from './thumbnails-maker.js';

const thumbnailsData = generatePhotoData();
printThumbnails(thumbnailsData);

