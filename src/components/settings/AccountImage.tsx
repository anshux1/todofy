"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { toast } from "sonner"

import { authClient } from "@/lib/auth.config"
import { useEdgeStore } from "@/lib/edgestore"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export const AccountImage = () => {
  const user = authClient.useSession().data?.user
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { edgestore } = useEdgeStore()
  const removeImage = async () => {
    const [, deleteResult] = await Promise.all([
      user?.image?.includes("files.edgestore.dev") &&
        edgestore.publicFiles.delete({
          url: user?.image as string,
        }),
      await authClient.updateUser({
        image: null,
      }),
    ])
    if (!deleteResult.data?.status) toast.error(deleteResult.error?.message)
  }
  console.log()
  const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("File size exceeds 4MB limit")
        return
      }
      const [, uploadResult] = await Promise.all([
        user?.image?.includes("files.edgestore.dev") &&
          edgestore.publicFiles.delete({
            url: user.image as string,
          }),
        edgestore.publicFiles.upload({
          file,
        }),
      ])
      await authClient.updateUser({
        image: uploadResult.url,
      })
    }
  }
  return (
    <div className="my-3 space-y-2 px-3.5">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative flex size-24 items-center justify-center overflow-hidden rounded-full",
            user?.image ? "bg-transparent" : "bg-pink-500",
          )}
        >
          <Image
            src={
              user?.image ||
              `https://d1nbslm0j6pual.cloudfront.net/?text=${user?.name.charAt(0)}&size=195&bg=ffffff`
            }
            alt="Uploaded photo"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              {user?.image ? "Change Photo" : "Upload Photo"}
            </Button>
            {user?.image && (
              <Button variant="destructive" type="button" onClick={removeImage}>
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
