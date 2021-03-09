const { BlobServiceClient } = require("@azure/storage-blob");
 


export async function uploadMediaIntoBlob(file, fileType){

    const storageAccountName = process.env.REACT_APP_ACCOUNT_NAME;
    const sasToken           = process.env.REACT_APP_SASTOKEN;
    const containerName      = process.env.REACT_APP_CONTAINER;

    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );

      if (fileType==='image') {
        file = dataURLtoFile(file, "compressedImageFile.jpg");
      }

        //const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        //const filename = file.name.substring(0, file.name.lastIndexOf('.'))
        const ext = file.name.substring(file.name.lastIndexOf('.'))
        //const blobName = filename + '_' + new Date().getTime() + ext
        const blobName = generateUUIDNameForBlob() + ext ;

        const containerNameStage = containerName;
        const containerClient = blobService.getContainerClient(containerNameStage);
        await containerClient.createIfNotExists(containerName);




        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const options = { blobHTTPHeaders: { blobContentType: file.type } };
        const uploadBlobResponse = await blockBlobClient.uploadData(file, options);

        console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

        const mediaURL = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blobName}`

        return mediaURL;

}



export function dataURLtoFile(dataurl, filename) {

  var urlStr = dataurl + "";
  var arr = urlStr.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);

  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}



function generateUUIDNameForBlob() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


export async function uploadMedia(file,connectionString) {


    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString)

    const filename = file.name.substring(0, file.name.lastIndexOf('.'))
    const ext = file.name.substring(file.name.lastIndexOf('.'))
    const blobName = filename + '_' + new Date().getTime() + ext
    const containerClient = blobServiceClient.getContainerClient('advertisements');
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(file, file.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

}