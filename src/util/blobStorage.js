import { onImageCompress } from "./Compress";
import { clearStorage } from "./localStorage";

const { BlobServiceClient } = require("@azure/storage-blob");

export function uploadMediaIntoBlob(file, oldFile) {
  const storageAccountName = process.env.REACT_APP_BLOB_ACCOUNT_NAME;
  const sasToken = process.env.REACT_APP_BLOB_SASTOKEN;
  const containerName = process.env.REACT_APP_BLOB_CONTAINER;

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

    const storageAccountName = process.env.REACT_APP_BLOB_ACCOUNT_NAME;
    const sasToken           = process.env.REACT_APP_SASTOKENN;
    const containerName      = process.env.REACT_APP_BLOB_CONTAINER;
    console.log("Token : "+ sasToken +" storageAccountName : "+ storageAccountName+ " containerName : "+ containerName);

    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );

    if (!file.type.includes('video')) {
      onImageCompress(file).then((file) => {
        file = dataURLtoFile(file, "compressedImageFile.jpg");
      });
    }

    const ext = file.name.substring(file.name.lastIndexOf("."));
    const blobName = generateUUIDNameForBlob() + ext;

    return new Promise((resolve, reject) => {
      const containerClient = blobService.getContainerClient(containerName);
      containerClient.createIfNotExists(containerName).then(() => {
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const options = { blobHTTPHeaders: { blobContentType: file.type } };
        blockBlobClient.uploadData(file, options).then((blob) => {
          const mediaURL = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blobName}`;
          console.log("mediaUrl from BLOB", mediaURL);
          resolve(mediaURL);
        });
      });
    });
  }
}

export function dataURLtoFile(dataurl, filename) {
  var urlStr = dataurl + "";
  var arr = urlStr.split(",");
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
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function uploadMedia(file, connectionString) {
  const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);

  const filename = file.name.substring(0, file.name.lastIndexOf("."));
  const ext = file.name.substring(file.name.lastIndexOf("."));
  const blobName = filename + "_" + new Date().getTime() + ext;
  const containerClient =
    blobServiceClient.getContainerClient("advertisements");
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(file, file.length);
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );
}
