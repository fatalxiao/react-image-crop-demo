import {useEffect} from 'react';
import {useState} from 'react';

const useRawSize = (src: string) => {

    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setWidth(img.width);
            setHeight(img.height);
        };
        img.src = src;
    }, [
        src
    ]);

    return [width, height];

};

export default useRawSize;
