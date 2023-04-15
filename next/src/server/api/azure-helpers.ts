import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob"

const account: string = process.env.AZURE_ACCOUNT_NAME
const accountKey: string = process.env.AZURE_ACCOUNT_KEY

const sharedKeyCredential: StorageSharedKeyCredential = new StorageSharedKeyCredential(
    account,
    accountKey
)

const blobServiceClient: BlobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
)

export async function uploadImage(image: string, blobName: string): Promise<string> {
    // Get a reference to the container
    const containerName = process.env.AZURE_CONTAINER_NAME
    const containerClient = blobServiceClient.getContainerClient(containerName)

    // Create the container if it doesn't exist
    await containerClient.createIfNotExists()

    // Get a reference to the block blob
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    // Upload the image
    await blockBlobClient.uploadData(Buffer.from(image, "utf-8"), {
        blobHTTPHeaders: {
            blobContentType: "image/jpeg", // Adjust the content type based on your image format
        },
    })

    return `https://${account}.blob.core.windows.net/${containerName}/${blobName}.jpeg`
}
