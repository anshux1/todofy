import {
  AlarmClock,
  Calendar1,
  CalendarDays,
  CalendarMinus,
  CircleCheck,
  Flag,
  Goal,
  Inbox,
  MapPin,
  Tag,
  UserRound,
} from "lucide-react"

export const featuresData = [
  {
    name: "Date",
    icon: CalendarMinus,
    shown: true,
    navigation: false,
  },
  {
    name: "Assignee",
    icon: UserRound,
    shown: true,
    navigation: false,
  },
  {
    name: "Priority",
    icon: Flag,
    shown: true,
    navigation: false,
  },
  {
    name: "Reminder",
    icon: AlarmClock,
    shown: true,
    navigation: false,
  },
  {
    name: "Label",
    icon: Tag,
    shown: true,
    navigation: false,
  },
  {
    name: "Deadline",
    icon: Goal,
    shown: false,
    navigation: false,
  },
  {
    name: "Location",
    icon: MapPin,
    shown: false,
    navigation: false,
  },
  {
    name: "Inbox",
    icon: Inbox,
    shown: true,
    navigation: true,
    href: "/inbox",
  },
  {
    name: "Today",
    icon: Calendar1,
    shown: true,
    navigation: true,
    href: "/today",
  },
  {
    name: "Upcoming",
    icon: CalendarDays,
    shown: true,
    navigation: true,
    href: "/upcoming",
  },
  {
    name: "Filters & Labels",
    icon: Tag,
    shown: true,
    navigation: true,
    href: "/filters",
  },
  {
    name: "Completed",
    icon: CircleCheck,
    shown: false,
    navigation: true,
    href: "/completed",
  },
]

export const featureDataMap = new Map(
  featuresData.map((item) => [item.name, item.icon]),
)
