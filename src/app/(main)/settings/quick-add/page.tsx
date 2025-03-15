import {
  AlarmClock,
  CalendarMinus,
  Flag,
  Goal,
  MapPin,
  Tag,
  UserRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default async function Page() {
  return (
    <div className="m-2 mx-2 flex h-8/12 max-w-3xl flex-col justify-between rounded-sm sm:mx-auto sm:w-full">
      <div className="px-3.5 py-2">
        <h2 className="mb-1 text-lg font-medium">Show task actions</h2>
        <div className="w-fit rounded-sm border">
          {tasksAction.added.map((item, index) => (
            <>
              <div className="bg-card flex w-72 items-center gap-2 rounded-sm px-3 py-2">
                <Checkbox className="mr-2" />{" "}
                <item.icon className="text-primary size-5 stroke-[1.3] font-thin" />
                <p>{item.name}</p>
              </div>
              {tasksAction.added.length - 1 !== index && (
                <Separator
                  orientation="horizontal"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
              )}
            </>
          ))}
        </div>
        <h2 className="mt-3 mb-1 text-lg font-medium">More actions</h2>
        <div className="w-fit rounded-sm border">
          {tasksAction.removed.map((item, index) => (
            <>
              <div className="bg-card flex w-72 cursor-pointer items-center gap-2 rounded-sm px-3 py-2">
                <Checkbox className="mr-2" />{" "}
                <item.icon className="text-primary size-5 stroke-[1.3] font-thin" />
                <p>{item.name}</p>
              </div>
              {tasksAction.removed.length - 1 !== index && (
                <Separator
                  orientation="horizontal"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
              )}
            </>
          ))}
        </div>
        <h2 className="mt-3 mb-1 text-lg font-medium"> Show action labels</h2>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <p>Off</p>
        </div>
      </div>

      <div className="flex w-full justify-end gap-2 border-t p-3">
        <Button variant="secondary">Cancel</Button>
        <Button>Save</Button>
      </div>
    </div>
  )
}

const tasksAction = {
  added: [
    {
      name: "Labels",
      icon: Tag,
      added: true,
    },
    {
      name: "Date",
      icon: CalendarMinus,
      added: true,
    },
    {
      name: "Reminder",
      icon: AlarmClock,
      added: true,
    },
    {
      name: "Assignee",
      icon: UserRound,
      added: true,
    },
  ],
  removed: [
    {
      name: "Location",
      icon: MapPin,
      added: true,
    },
    {
      name: "Deadline",
      icon: Goal,
      added: true,
    },
    {
      name: "Priority",
      icon: Flag,
      added: true,
    },
  ],
}
