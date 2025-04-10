import { useCallback, useState } from "react"
import { BlobServiceClient } from "@azure/storage-blob"

interface useFileUploadOptions {
  onSuccess?: (url: string) => void
  onError?: (error: string) => void
  onComplete?: () => void
}

const blobServiceClient = new BlobServiceClient(
  process.env.AZURE_BLOB_SAS_URL || "",
)
const containerName = process.env.AZURE_BLOB_CONTAINER_NAME || ""
const containerClient = blobServiceClient.getContainerClient(containerName)

export const useFileUpload = (options?: useFileUploadOptions) => {
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const uploadFile = useCallback(
    async (file: File, userId: string) => {
      if (!file) return
      setIsUploading(true)
      setProgress(0)
      try {
        const blockBlobClient = containerClient.getBlockBlobClient(
          `${userId}-${Date.now()}`,
        )
        const res = await blockBlobClient.uploadBrowserData(file, {
          blobHTTPHeaders: {
            blobContentType: file.type,
          },
          onProgress: (progress) => {
            if (progress.loadedBytes && file.size) {
              const percentage = Math.round(
                (progress.loadedBytes / file.size) * 100,
              )
              setProgress(percentage)
            }
          },
        })
        if (res._response.status !== 201) {
          if (options?.onError) options.onError("Failed to upload file")
          return
        }
        if (options?.onSuccess) options.onSuccess(blockBlobClient.url)
      } catch {
        return { Error: "Failed to upload file" }
      } finally {
        setIsUploading(false)
        if (options?.onComplete) options.onComplete()
      }
    },
    [options],
  )

  return {
    progress,
    uploadFile,
    isUploading,
  }
}
