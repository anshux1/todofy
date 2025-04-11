import { BlobServiceClient } from "@azure/storage-blob"

console.log("SAS Url :", process.env.NEXT_PUBLIC_AZURE_BLOB_SAS_URL)
export const blobServiceClient = new BlobServiceClient(
  process.env.NEXT_PUBLIC_AZURE_BLOB_SAS_URL || "",
)
export const containerName =
  process.env.NEXT_PUBLIC_AZURE_BLOB_CONTAINER_NAME || ""
export const containerClient =
  blobServiceClient.getContainerClient(containerName)
