/**
 * @file App.tsx
 */

// Hooks
import {useState, useRef, useEffect, useCallback, useMemo} from 'react';

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
    const [scale, setScale] = useState<number>(1);

    const [editorHeight, setEditorHeight] = useState<number>(0);

    // imageType state
    const [imageType, setImageType] = useState<ImageType>(ImageTypes[0]);

    // crop state
    const [crop, setCrop] = useState<PixelCrop>();

    const actualWidth = useMemo(() => {
        return ~~((crop?.width || 0) / scale);
    }, [
        crop?.width, scale
    ]);
    const actualHeight = useMemo(() => {
        return ~~((crop?.height || 0) / scale);
    }, [
        crop?.height, scale
    ]);

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
        const editorHeight = ~~(naturalHeight * scale);
        setEditorHeight(editorHeight);

        const cropWidth = imageType.recommendedWidth * scale;
        const cropHeight = imageType.recommendedHeight * scale;
        setCrop({
            x: (editorWidth - cropWidth) / 2,
            y: (editorHeight - cropHeight) / 2,
            width: cropWidth,
            height: cropHeight,
            unit: 'px'
        });

    }, [
        imageType
    ]);

    /**
     * Init when imageType changed
     */
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

            <div style={{
                marginBottom: 16
            }}>
                <select style={{
                    height: 24
                }}
                        value={imageType.id}
                        onChange={handleImageTypeChange}>
                    {ImageTypes.map(imageType =>
                        <option value={imageType.id}>
                            {imageType.label}
                        </option>
                    )}
                </select>
                <br/>
                Recommended size: {imageType.recommendedWidth}px * {imageType.recommendedHeight}px
                <br/>
                Min size: {imageType.minWidth}px * {imageType.minHeight}px
            </div>

            <div style={{
                marginBottom: 16
            }}>
                Editor size: {editorWidth}px * {editorHeight}px
                <div>
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
                </div>
            </div>

            Actual size: {actualWidth}px * {actualHeight}px

            {!!crop && (
                <div>
                    <canvas ref={previewCanvasRef}
                            style={{
                                width: actualWidth,
                                height: actualHeight
                            }}/>
                </div>
            )}

        </>
    );

};

export default App;
