import {useState, useRef, useEffect, ChangeEvent} from 'react';
import ReactCrop, {Crop} from 'react-image-crop';
import useRawSize from './useRawSize.ts';
import 'react-image-crop/dist/ReactCrop.css';
import {useCallback} from 'react';

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

    const [rawWidth, rawHeight] = useRawSize(imgSrc);
    const currentWidth = 500;
    const ratio = currentWidth / rawWidth;
    const currentHeight = rawHeight * ratio;

    const [imageType, setImageType] = useState<ImageType>(ImageTypes[0]);
    const [crop, setCrop] = useState<Crop>();

    const handleImageTypeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setImageType(ImageTypes.find((i) => i.id === e.target.value) || ImageTypes[0]);
    }, []);

    useEffect(() => {
        const width = imageType.recommendedWidth * ratio;
        const height = imageType.recommendedHeight * ratio;
        setCrop({
            x: (currentWidth - width) / 2,
            y: (currentHeight - height) / 2,
            width,
            height,
            unit: 'px'
        });
    }, [
        imageType, ratio, rawWidth, rawHeight, currentHeight
    ]);

    return (
        <>

            <div style={{marginBottom: 24}}>
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
                       minWidth={imageType.minWidth * ratio}
                       minHeight={imageType.minHeight * ratio}
                       onChange={setCrop}>
                <img ref={imgRef}
                     width={currentWidth}
                     alt="Crop me"
                     src={imgSrc}/>
            </ReactCrop>

        </>
    );

};

export default App;
