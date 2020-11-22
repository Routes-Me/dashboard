const { BlobServiceClient } = require("@azure/storage-blob");
 


export async function uploadMediaIntoBlob(file, storageAccountName, sasToken){

    const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
      );


        //const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        //const filename = file.name.substring(0, file.name.lastIndexOf('.'))
        const ext = file.name.substring(file.name.lastIndexOf('.'))
        //const blobName = filename + '_' + new Date().getTime() + ext
        const blobName = generateUUIDNameForBlob() + ext ;

        const containerClient = blobService.getContainerClient('advertisements');
        await containerClient.createIfNotExists('advertisements');




        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const options = { blobHTTPHeaders: { blobContentType: file.type } };
        const uploadBlobResponse = await blockBlobClient.uploadData(file, options);

        console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

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