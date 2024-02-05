/**
 * @file ImageTypes.ts
 */

// Types
import type {ImageType} from './ImageType.ts';

const ImageTypes: ImageType[] = [{
    id: 'LANDSCAPE',
    label: 'Landscape',
    aspect: 1.91,
    recommendedWidth: 1200,
    recommendedHeight: 628,
    minWidth: 600,
    minHeight: 314
}, {
    id: 'SQUARE',
    label: 'Square',
    aspect: 1,
    recommendedWidth: 1200,
    recommendedHeight: 1200,
    minWidth: 300,
    minHeight: 300
}, {
    id: 'PORTRAIT',
    label: 'Portrait',
    aspect: 4 / 5,
    recommendedWidth: 960,
    recommendedHeight: 1200,
    minWidth: 480,
    minHeight: 600
}, {
    id: 'LOGO',
    label: 'Logo',
    aspect: 1,
    recommendedWidth: 1200,
    recommendedHeight: 1200,
    minWidth: 128,
    minHeight: 128
}, {
    id: 'LANDSCAPE_LOGO',
    label: 'Landscape Logo',
    aspect: 4,
    recommendedWidth: 1200,
    recommendedHeight: 300,
    minWidth: 512,
    minHeight: 128
}];

export default ImageTypes;
