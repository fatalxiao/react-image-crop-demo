import {useState, useRef, useEffect, ChangeEvent, useCallback} from 'react';
import ReactCrop, {PixelCrop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import canvasPreview from './CanvasPreview';

type ImageType = {
    id: string
    label: string
    aspect: number
    recommendedWidth: number
    recommendedHeight: number
    minWidth: number
    minHeight: number
}

const ImageTypes: ImageType[] = [{
    id: 'MARKETING_IMAGE',
    label: 'Marketing Image',
    aspect: 1.91,
    recommendedWidth: 1200,
    recommendedHeight: 628,
    minWidth: 600,
    minHeight: 314
}, {
    id: 'SQUARE_MARKETING_IMAGE',
    label: 'Square Marketing Image',
    aspect: 1,
    recommendedWidth: 1200,
    recommendedHeight: 1200,
    minWidth: 300,
    minHeight: 300
}, {
    id: 'LOGO',
    label: 'Logo',
    aspect: 1,
    recommendedWidth: 1200,
    recommendedHeight: 1200,
    minWidth: 128,
    minHeight: 128
}];

const imgSrc =
    'https://www.intechnic.com/hubfs/Blog/Featured%20Images/Best%20Hotel%20Website%20Designs.jpg';

const App = () => {

    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const currentWidth = 500;

    const [scale, setScale] = useState(1);

    const [imageType, setImageType] = useState<ImageType>(ImageTypes[0]);
    const [crop, setCrop] = useState<PixelCrop>();

    const handleImageTypeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setImageType(ImageTypes.find((i) => i.id === e.target.value) || ImageTypes[0]);
    }, []);

    const init = useCallback(() => {
        const naturalWidth = imgRef.current?.naturalWidth || 0;
        const naturalHeight = imgRef.current?.naturalHeight || 0;
        const currentWidth = 500;
        const scale = currentWidth / naturalWidth;
        const currentHeight = naturalHeight * scale;
        const width = imageType.recommendedWidth * scale;
        const height = imageType.recommendedHeight * scale;
        setScale(scale);
        setCrop({
            x: (currentWidth - width) / 2,
            y: (currentHeight - height) / 2,
            width,
            height,
            unit: 'px'
        });
    }, [imageType]);

    useEffect(() => {
        init();
    }, [
        init
    ]);

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
                     width={currentWidth}
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
