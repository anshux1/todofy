import React from "react"
import { featuresIcons } from "@/constants/quick-add"
import { ListFilterIcon } from "lucide-react"

import { UserFeature } from "@prisma/client"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

interface QuickAddTaskExampleProps {
  addedTaskFeatures: UserFeature[]
  removedTaskFeatures: UserFeature[]
}

export const QuickAddTaskExample = ({
  addedTaskFeatures,
  removedTaskFeatures,
}: QuickAddTaskExampleProps) => {
  return (
    <div>
      <h2 className="text-muted-foreground mb-1 text-lg">Example :</h2>
      <Card className="w-fit px-3.5">
        <CardContent className="flex w-fit flex-wrap items-center gap-2 px-3 py-5">
          {addedTaskFeatures.map((item) => {
            const Icon = featuresIcons.get(item.name)
            return (
              <Button
                variant="outline"
                size="sm"
                key={item.id}
                className="capitalize"
              >
                {Icon && <Icon size={14} aria-hidden="true" className="mr-1" />}
                {item.name}
              </Button>
            )
          })}
          {removedTaskFeatures.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" aria-label="Filters">
                  <ListFilterIcon size={14} aria-hidden="true" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1">
                {removedTaskFeatures.map((item) => {
                  const Icon = featuresIcons.get(item.name)
                  return (
                    <div
                      key={item.id}
                      className="hover:bg-secondary flex items-center gap-2 rounded-sm px-3 py-1 font-medium"
                    >
                      {Icon && (
                        <Icon
                          size={16}
                          aria-hidden="true"
                          className="text-primary mr-1"
                        />
                      )}
                      <span className="capitalize">{item.name}</span>
                    </div>
                  )
                })}
              </PopoverContent>
            </Popover>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
