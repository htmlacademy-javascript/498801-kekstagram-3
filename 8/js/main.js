import { generatePhotoData } from './generate-photo-data.js';
import { printThumbnails} from './thumbnails-maker.js';
import { initGallery } from './init-gallery.js';

const thumbnailsData = generatePhotoData();

printThumbnails(thumbnailsData);
initGallery(thumbnailsData);

