"use client"

import { useState } from "react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth.config"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export const AccountDeleteDialog = () => {
  const [value, setValue] = useState("")
  const handleDelete = async () => {
    try {
      await authClient.deleteUser({ callbackURL: "/signup" })
      toast.success("Account deleted successfully")
    } catch {
      toast.error("Failed to delete account")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-fit">
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[30%] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription className="tracking-wide">
            This action is irreversible. To confirm, please enter the project
            name <span className="font-medium text-red-700">DELETE</span>
          </DialogDescription>
        </DialogHeader>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="mt-2 sm:mt-0" type="submit">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={value !== "DELETE"}
            variant="destructive"
            onClick={handleDelete}
          >
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
