import { useMemo } from "react"
import { datePatterns, getDayDate, monthMappings } from "@/constants/features"
import { getYear, isValid, parse, setMonth, startOfMonth } from "date-fns"

export const useDateParse = (inputValue: string) => {
  return useMemo(() => {
    if (!inputValue) {
      return
    }
    const words = inputValue.toLowerCase().split(" ").filter(Boolean)

    if (words.length === 1) {
      const date = getDayDate(words[0])
      if (date) {
        return date
      }

      if (monthMappings[words[0]] !== undefined) {
        return startOfMonth(setMonth(new Date(), monthMappings[words[0]]))
      }
    }

    if (words.length === 2) {
      const [first, second] = words

      // Handle "1 Mar" and "Mar 1"
      if (!isNaN(parseInt(first)) && monthMappings[second] !== undefined) {
        return new Date(
          getYear(new Date()),
          monthMappings[second],
          parseInt(first),
        )
      }
      if (monthMappings[first] !== undefined && !isNaN(parseInt(second))) {
        return new Date(
          getYear(new Date()),
          monthMappings[first],
          parseInt(second),
        )
      }

      // Handle "Mar 2024"
      if (
        monthMappings[first] !== undefined &&
        second.length === 4 &&
        !isNaN(parseInt(second))
      ) {
        return startOfMonth(
          setMonth(new Date(parseInt(second), 0), monthMappings[first]),
        )
      }
    }

    if (words.length === 3) {
      const [first, second, third] = words

      // Handle "1 Mar 2024" and "Mar 1 2024"
      if (
        !isNaN(parseInt(first)) &&
        monthMappings[second] !== undefined &&
        !isNaN(parseInt(third))
      ) {
        return new Date(parseInt(third), monthMappings[second], parseInt(first))
      }
      if (
        monthMappings[first] !== undefined &&
        !isNaN(parseInt(second)) &&
        !isNaN(parseInt(third))
      ) {
        return new Date(parseInt(third), monthMappings[first], parseInt(second))
      }
    }

    for (const pattern of datePatterns) {
      const parsedDate = parse(inputValue, pattern, new Date())
      if (isValid(parsedDate)) {
        return parsedDate
      }
    }
    return undefined
  }, [inputValue])
}
