"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { toast } from "sonner"

import { authClient } from "@/lib/auth/config"
import { cn } from "@/lib/utils"
import { useAction } from "@/hooks/useAction"
import { useFileUpload } from "@/hooks/useFileUpload"
import { Button } from "@/components/ui/button"
import { deleteImage } from "@/actions/user"

export const AccountImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const user = authClient.useSession().data?.user
  const { execute, isLoading } = useAction(deleteImage)
  const { uploadFile, isUploading } = useFileUpload({
    onSuccess: async (image) => {
      await authClient.updateUser({ image })
    },
  })

  const removeImage = async () => {
    const imageUrl = user?.image
    if (!imageUrl) return
    if (imageUrl.includes("todofy.blob.core.windows.net")) {
      await execute({ imageUrl })
    }
    await authClient.updateUser({ image: "" })
  }

  const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const maxFileSize = 4 * 1024 * 1024 // 4MB
    if (file.size > maxFileSize) {
      toast.error("File size exceeds 4MB limit")
      return
    }
    uploadFile(file, user?.id)
  }

  const fallbackImage = `https://d1nbslm0j6pual.cloudfront.net/?text=${user?.name.charAt(0)}&size=195&bg=ffffff`
  return (
    <div className="my-3 space-y-2">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative flex size-20 items-center justify-center overflow-hidden rounded-full sm:size-24",
            user?.image ? "bg-transparent" : "bg-pink-500",
          )}
        >
          <Image
            src={user?.image || fallbackImage}
            alt="Uploaded photo"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              disabled={isUploading}
              variant="outline"
              type="button"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              {user?.image ? "Change Photo" : "Upload Photo"}
            </Button>
            {user?.image && (
              <Button
                size="sm"
                disabled={isLoading}
                variant="destructive"
                type="button"
                onClick={removeImage}
              >
                Remove Photo
              </Button>
            )}
            <input
              ref={fileInputRef}
              id="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={changeImage}
            />
          </div>
          <p className="text-muted-foreground text-xs">
            Pick a photo up to 4MB. Your avatar photo will be public.
          </p>
        </div>
      </div>
    </div>
  )
}
