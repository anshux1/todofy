import { clsx, type ClassValue } from "clsx"
import { format, set } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTimeSlots() {
  const times: string[] = []
  const current = set(new Date(), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })
  for (let i = 0; i < (24 * 60) / 15; i++) {
    times.push(format(current, "HH:mm"))
    current.setMinutes(current.getMinutes() + 15)
  }
  return times
}
