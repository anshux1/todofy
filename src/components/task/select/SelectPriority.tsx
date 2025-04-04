import { JSX } from "react"
import { PriorityOptions } from "@/constants/features"
import { Flag } from "lucide-react"
import { Control, FieldValues, Path } from "react-hook-form"

import { cn } from "@/lib/utils"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

export function SelectPriority<F extends FieldValues>(props: {
  control: Control<F>
  name: Path<F>
  popoverTrigger: () => JSX.Element
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger
                  showIcon={false}
                  className={cn(
                    "h-8 capitalize",
                    field.value && "bg-secondary",
                  )}
                >
                  <Flag size={14} aria-hidden="true" className="mr-1" />
                  {field.value > 0 ? `P${field.value}` : "Priority"}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PriorityOptions.map((item) => (
                  <SelectItem
                    showIcon={false}
                    value={item.value.toString()}
                    className="flex items-center"
                    key={item.value}
                  >
                    <item.Icon
                      className={cn("inline-flex size-5", item.className)}
                    />
                    <span className="ml-2">{item.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
