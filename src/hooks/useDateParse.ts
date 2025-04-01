import { Dispatch, useMemo } from "react"
import { datePatterns, getDayDate, monthMappings } from "@/constants/features"
import { getYear, isValid, parse, setMonth, startOfMonth } from "date-fns"

export const useDateParse = (
  inputValue: string,
  setDate: Dispatch<React.SetStateAction<Date | undefined>>,
) => {
  useMemo(() => {
    if (!inputValue) {
      return
    }
    const words = inputValue.toLowerCase().split(" ").filter(Boolean)

    if (words.length === 1) {
      const date = getDayDate(words[0])
      if (date) {
        setDate(date)
        return
      }

      if (monthMappings[words[0]] !== undefined) {
        setDate(startOfMonth(setMonth(new Date(), monthMappings[words[0]])))
        return
      }
    }

    if (words.length === 2) {
      const [first, second] = words

      // Handle "1 Mar" and "Mar 1"
      if (!isNaN(parseInt(first)) && monthMappings[second] !== undefined) {
        setDate(
          new Date(getYear(new Date()), monthMappings[second], parseInt(first)),
        )
        return
      }
      if (monthMappings[first] !== undefined && !isNaN(parseInt(second))) {
        setDate(
          new Date(getYear(new Date()), monthMappings[first], parseInt(second)),
        )
        return
      }

      // Handle "Mar 2024"
      if (
        monthMappings[first] !== undefined &&
        second.length === 4 &&
        !isNaN(parseInt(second))
      ) {
        setDate(
          startOfMonth(
            setMonth(new Date(parseInt(second), 0), monthMappings[first]),
          ),
        )
        return
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
        setDate(
          new Date(parseInt(third), monthMappings[second], parseInt(first)),
        )
        return
      }
      if (
        monthMappings[first] !== undefined &&
        !isNaN(parseInt(second)) &&
        !isNaN(parseInt(third))
      ) {
        setDate(
          new Date(parseInt(third), monthMappings[first], parseInt(second)),
        )
        return
      }
    }

    for (const pattern of datePatterns) {
      const parsedDate = parse(inputValue, pattern, new Date())
      if (isValid(parsedDate)) {
        setDate(parsedDate)
        return
      }
    }
  }, [inputValue, setDate])
}
