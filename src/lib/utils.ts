import { clsx, type ClassValue } from "clsx"
import { format, set } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTimeSlots(date: Date) {
  const times: {
    value: Date
    label: string
  }[] = []
  const start = set(date, {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })
  for (let i = 0; i < (24 * 60) / 15; i++) {
    const time = new Date(start.getTime())
    time.setMinutes(time.getMinutes() + i * 15)
    times.push({
      label: format(time, "HH:mm"),
      value: time,
    })
  }
  return times
}
