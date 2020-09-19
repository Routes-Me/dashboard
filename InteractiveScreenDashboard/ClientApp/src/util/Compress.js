import Resizer from 'react-image-file-resizer';

export function onImageCompress(image) {
    //const file = File.target.files[0];

    //Resizer.imageFileResizer(
    //    File, // the file from input
    //    160, // width
    //    600, // height
    //    "JPEG", // compress format WEBP, JPEG, PNG
    //    70, // quality
    //    0, // rotation
    //    (uri) => {
    //        console.log(uri);// You upload logic goes here
    //    },
    //    "base64" // blob or base64 default base64
    //);

    const compressedImage = resizeFile(image);
    return compressedImage;

}


const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 160, 600, 'JPEG', 100, 0,
        uri => {
            resolve(uri);
        },
        'base64'
    );
});



export const onVideoCompress = File => {

}