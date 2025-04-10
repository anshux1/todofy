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
    href: "/app/inbox",
  },
  {
    name: "Today",
    icon: Icons.Calendar1,
    shown: true,
    navigation: true,
    href: "/app/today",
  },
  {
    name: "Upcoming",
    icon: Icons.CalendarDays,
    shown: true,
    navigation: true,
    href: "/app/upcoming",
  },
  {
    name: "Labels",
    icon: Icons.Tag,
    shown: true,
    navigation: true,
    href: "/app/labels",
  },
  {
    name: "Completed",
    icon: Icons.CircleCheck,
    shown: false,
    navigation: true,
    href: "/app/completed",
  },
]

export const featuresIcons = new Map<string, Icons.LucideIcon>(
  featuresData.map(({ name, icon }) => [name, icon]),
)
