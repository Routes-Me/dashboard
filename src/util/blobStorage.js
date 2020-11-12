const AzureStorageBlob = require("@azure/storage-blob");

const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
 
// Enter your storage account name and shared key
const account = "routesme";
const accountKey = "Xfk6WHi+9NquO1OTBWsQxb0RCJ0wLPQkXD87nq6gaYvOgdXymKmGiiMAsj+5SZp5971JFdaBbzgb1ZRavRoIQw==";
 
// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);


async function createContainer() {
    // Create a container
    const containerName = `newcontainer${new Date().getTime()}`;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.create();
    console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
  }

async function listContainer(){
    let containers = blobServiceClient.listContainers();
    for await (const container of containers) {
      console.log(`Container ${i++}: ${container.name}`);
    }
}

export async function uploadMedia(file) {
    const containerClient = blobServiceClient.getContainerClient('advertisements');

    const blobName = "newblob" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(file, file.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
}