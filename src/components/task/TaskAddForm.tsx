"use client"

import { JSX, ReactNode, useEffect, useState } from "react"
import { featureDataMap } from "@/constants/features"

import { UserFeature } from "@prisma/client"
import { AutoResizeTextarea } from "@/components/ui/auto-resize-textarea"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { getUserFeatures } from "@/db/data/account"
import { SelectDate } from "./select/SelectDate"
import { SelectPriority } from "./select/SelectPriority"

const featuresMap = new Map<
  string,
  (props: { children: ReactNode }) => JSX.Element
>([
  ["Date", ({ children }) => <SelectDate>{children}</SelectDate>],
  ["Priority", ({ children }) => <SelectPriority>{children}</SelectPriority>],
])

export function TaskAddForm() {
  const [features, setFeatures] = useState<UserFeature[]>([])
  useEffect(() => {
    const fetchFeatures = async () => {
      const quickAddFeatures = await getUserFeatures()
      setFeatures(quickAddFeatures.filter((item) => item.type === "TASK"))
    }
    fetchFeatures()
  }, [])
  console.log(features)
  return (
    <div>
      <div className="px-4 pt-4">
        <AutoResizeTextarea
          id="name"
          className="bg-background h-auto w-full pr-4 text-lg font-semibold focus:outline-none"
          placeholder="Finish Slides by Monday 10am p1"
        />
        <AutoResizeTextarea
          id="name"
          className="bg-background h-auto w-full pr-4 text-xs focus:outline-none"
          placeholder="Descrpition"
        />
        <div className="my-2 flex flex-wrap gap-2">
          {features.map((item) => {
            const [Icon, Component] = [
              featureDataMap.get(item.name),
              featuresMap.get(item.name),
            ]
            return (
              Component && (
                <Component key={item.id}>
                  <Button variant="outline" size="sm" className="capitalize">
                    {Icon && (
                      <Icon size={14} aria-hidden="true" className="mr-1" />
                    )}
                    {item.name}
                  </Button>
                </Component>
              )
            )
          })}
        </div>
      </div>
      <Separator />
      <DialogFooter className="flex-row justify-end p-3">
        <DialogClose asChild>
          <Button size="xs" type="submit" variant="ghost">
            Cancel
          </Button>
        </DialogClose>
        <Button size="xs" type="submit">
          Add task
        </Button>
      </DialogFooter>
    </div>
  )
}
