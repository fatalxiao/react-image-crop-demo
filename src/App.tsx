/**
 * @file App.tsx
 */

// Hooks
import {useState, useRef, useEffect, useCallback} from 'react';

// Components
import ReactCrop from 'react-image-crop';

// Statics
import ImageTypes from './ImageTypes';

// Vendors
import canvasPreview from './CanvasPreview';

// Styles
import 'react-image-crop/dist/ReactCrop.css';

// Types
import type {ChangeEvent} from 'react';
import type {PixelCrop} from 'react-image-crop';
import type {ImageType} from './ImageType.ts';

// Image sorce
const imgSrc =
    'https://www.intechnic.com/hubfs/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg';

// Editor width
const editorWidth = 500;

const App = () => {

    // References
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    // scale state
    const [scale, setScale] = useState(1);

    // imageType state
    const [imageType, setImageType] = useState<ImageType>(ImageTypes[0]);

    // crop state
    const [crop, setCrop] = useState<PixelCrop>();

    /**
     * Handle imageType change
     */
    const handleImageTypeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setImageType(ImageTypes.find((i) => i.id === e.target.value) || ImageTypes[0]);
    }, []);

    /**
     * Handle the image load event and init scale and crop
     */
    const init = useCallback(() => {

        if (!imgRef?.current) {
            return;
        }

        // Get naturalWidth and naturalHeight of image
        const naturalWidth = imgRef.current.naturalWidth || 0;
        const naturalHeight = imgRef.current.naturalHeight || 0;

        if (naturalWidth === 0 || naturalHeight === 0) {
            return;
        }

        // Calculate and init scale
        const scale = editorWidth / naturalWidth;
        setScale(scale);

        // Calculate and init crop
        const currentHeight = naturalHeight * scale;
        const cropWidth = imageType.recommendedWidth * scale;
        const cropHeight = imageType.recommendedHeight * scale;
        setCrop({
            x: (editorWidth - cropWidth) / 2,
            y: (currentHeight - cropHeight) / 2,
            width: cropWidth,
            height: cropHeight,
            unit: 'px'
        });

    }, [
        imageType
    ]);

    // Init when imageType changed
    useEffect(() => {
        init();
    }, [
        init
    ]);

    /**
     * Update preview when crop changed
     */
    useEffect(() => {
        if (crop?.width && crop?.height && imgRef.current && previewCanvasRef.current) {
            canvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                crop
            );
        }
    }, [
        crop
    ]);

    return (
        <>

            <div style={{marginBottom: 8}}>
                <select value={imageType.id}
                        onChange={handleImageTypeChange}>
                    {ImageTypes.map(imageType =>
                        <option value={imageType.id}>
                            {imageType.label}
                        </option>
                    )}
                </select>
            </div>

            <ReactCrop crop={crop}
                       aspect={imageType.aspect}
                       minWidth={imageType.minWidth * scale}
                       minHeight={imageType.minHeight * scale}
                       onChange={setCrop}>
                <img ref={imgRef}
                     width={editorWidth}
                     alt="Crop me"
                     src={imgSrc}
                     onLoad={init}/>
            </ReactCrop>

            {!!crop && (
                <div>
                    <canvas ref={previewCanvasRef}
                            style={{
                                width: crop.width / scale,
                                height: crop.height / scale
                            }}/>
                </div>
            )}

        </>
    );

};

export default App;
