import React, { JSX } from "react"
import { colorOptions } from "@/utils/constants/task"
import { Control, FieldValues, Path } from "react-hook-form"

import { cn } from "@/lib/utils"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FormSetValueType } from "../TaskAddForm"

export function SelectColor<F extends FieldValues>(props: {
  control: Control<F>
  name: Path<F>
  setValue: FormSetValueType
  popoverTrigger: () => JSX.Element
}) {
  return (
    <Popover>
      <PopoverTrigger className={cn("")} asChild>
        {props.popoverTrigger()}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit px-4 py-3.5">
        <FormField
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  className="flex gap-1.5"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  {colorOptions.map((colorOption) => (
                    <Tooltip key={colorOption.value}>
                      <TooltipTrigger asChild>
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem
                              key={colorOption.value}
                              id={`color-${colorOption.value}`}
                              value={colorOption.value || ""}
                              aria-label={colorOption.label}
                              className={cn(
                                "size-6 shadow-none",
                                colorOption.bgClass,
                                colorOption.borderClass,
                              )}
                            />
                          </FormControl>
                        </FormItem>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="px-2 py-1 text-xs"
                      >
                        {colorOption.label}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </PopoverContent>
    </Popover>
  )
}
