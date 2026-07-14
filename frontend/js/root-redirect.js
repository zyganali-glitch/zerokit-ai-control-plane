import { buildPreviewUrl } from './static-paths.js';

window.location.replace(buildPreviewUrl(window.location.href));
