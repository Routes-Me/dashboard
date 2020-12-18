import Resizer from 'react-image-file-resizer';

export async function onImageCompress(image) {

    const compressedImage = await resizeFile(image);
    return compressedImage;

}


const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 160, 600, 'JPEG', 100, 0,
        uri => {
            resolve(uri);
        },
        'Blob'
    );
});

export const calculateImageSize = (base64String) => {
    let padding, inBytes, base64StringLength;
    if (base64String.endsWith("==")) padding = 2;
    else if (base64String.endsWith("=")) padding = 1;
    else padding = 0;

    base64StringLength = base64String.length;
    inBytes = (base64StringLength / 4) * 3 - padding;
    console.log(inBytes);
    this.kbytes = inBytes / 1000;
    return this.kbytes;
}