import {
  addDays,
  nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday,
  set,
  startOfDay,
} from "date-fns"
import * as Icons from "lucide-react"

export const featuresData = [
  {
    name: "Date",
    icon: Icons.CalendarMinus,
    shown: true,
    navigation: false,
  },
  {
    name: "Assignee",
    icon: Icons.UserRound,
    shown: true,
    navigation: false,
  },
  {
    name: "Priority",
    icon: Icons.Flag,
    shown: true,
    navigation: false,
  },
  {
    name: "Reminder",
    icon: Icons.AlarmClock,
    shown: true,
    navigation: false,
  },
  {
    name: "Label",
    icon: Icons.Tag,
    shown: true,
    navigation: false,
  },
  {
    name: "Deadline",
    icon: Icons.Goal,
    shown: false,
    navigation: false,
  },
  {
    name: "Location",
    icon: Icons.MapPin,
    shown: false,
    navigation: false,
  },
  {
    name: "Inbox",
    icon: Icons.Inbox,
    shown: true,
    navigation: true,
    href: "/inbox",
  },
  {
    name: "Today",
    icon: Icons.Calendar1,
    shown: true,
    navigation: true,
    href: "/today",
  },
  {
    name: "Upcoming",
    icon: Icons.CalendarDays,
    shown: true,
    navigation: true,
    href: "/upcoming",
  },
  {
    name: "Filters & Labels",
    icon: Icons.Tag,
    shown: true,
    navigation: true,
    href: "/filters",
  },
  {
    name: "Completed",
    icon: Icons.CircleCheck,
    shown: false,
    navigation: true,
    href: "/completed",
  },
]

export const SelectDateOptions = [
  {
    name: "Today",
    Icon: Icons.CalendarHeart,
    className: "stroke-rose-600",
    value: new Date(),
  },
  {
    name: "Tommorow",
    Icon: Icons.Sun,
    className: "stroke-orange-400",
    value: addDays(new Date(), 1),
  },
  {
    name: "Next Week",
    Icon: Icons.CalendarArrowUp,
    className: "stroke-purple-600",
    value: set(nextMonday(new Date()), { hours: 0, minutes: 0, seconds: 0 }),
  },
  {
    name: "No Date",
    Icon: Icons.Ban,
    className: "stroke-red-600/80",
    value: undefined,
  },
]

export const PriorityOptions = [
  {
    name: "Priority 1",
    Icon: Icons.Flag,
    className: "fill-red-600 stroke-red-600",
    value: 1,
  },
  {
    name: "Priority 2",
    Icon: Icons.Flag,
    className: "stroke-orange-400 fill-orange-400",
    value: 2,
  },
  {
    name: "Priority 3",
    Icon: Icons.Flag,
    className: "stroke-green-600 fill-green-600",
    value: 3,
  },
  {
    name: "Priority 4",
    Icon: Icons.Flag,
    className: "stroke-gray-600 fill-gray-600",
    value: 4,
  },
]

export const featureDataMap = new Map<string, Icons.LucideIcon>(
  featuresData.map(({ name, icon }) => [name, icon]),
)

export const dayMappings: Record<string, () => Date> = {
  monday: () => startOfDay(nextMonday(new Date())),
  tuesday: () => startOfDay(nextTuesday(new Date())),
  wednesday: () => startOfDay(nextWednesday(new Date())),
  thursday: () => startOfDay(nextThursday(new Date())),
  friday: () => startOfDay(nextFriday(new Date())),
  saturday: () => startOfDay(nextSaturday(new Date())),
  sunday: () => startOfDay(nextSunday(new Date())),
}

export const dayAliases: Record<string, string> = {
  mon: "monday",
  tue: "tuesday",
  wed: "wednesday",
  thu: "thursday",
  fri: "friday",
  sat: "saturday",
  sun: "sunday",
}

export const getDayDate = (input: string): Date | undefined => {
  const normalized = dayAliases[input] || input // Convert "mon" → "monday"
  return dayMappings[normalized]?.()
}

export const monthMappings: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
}

export const datePatterns = [
  "d MMM yyyy",
  "d MMM",
  "MMM d yyyy",
  "MMM d",
  "MMM yyyy d",
  "yyyy-MM-dd",
  "d/M/yyyy",
  "M/d/yyyy",
]
