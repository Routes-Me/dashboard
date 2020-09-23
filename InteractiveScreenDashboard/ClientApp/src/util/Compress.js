import Resizer from 'react-image-file-resizer';

export async function onImageCompress(image) {
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

    const compressedImage = await resizeFile(image);
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



export const onVideoCompress = (filepath) => {

    var ffmpeg = require('ffmpeg');

    try {
        var process = new ffmpeg(filepath);
        process.then(function (video) {
            video
                .setVideoBitRate(800)
                .setVideoDuration(30)
                .setVideoCodec('mpeg4')
                .setVideoAspectRatio('16:9')
                .save('C:/Users/Hp/Downloads/Simulater Sample/compressed.mp4', function (error, file) {
                    if (!error)
                        console.log('Video file: ' + file);
                });

        }, function (err) {
            console.log('Error: ' + err);
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }

}