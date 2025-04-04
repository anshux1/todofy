"use client"

import React, { JSX, useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Eye, EyeOff } from "lucide-react"
import { Control, FieldValues, Path } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AutoResizeTextarea } from "./ui/auto-resize-textarea"
import { Checkbox } from "./ui/checkbox"

export function FieldLabel(props: {
  children?: React.ReactNode
  required?: boolean
  className?: string
}) {
  return (
    <FormLabel className={cn("flex", props.className)}>
      {props.children}
      {props.required ? <span className="text-zinc-500">{"*"}</span> : null}
    </FormLabel>
  )
}

export function InputField<F extends FieldValues>(props: {
  control: Control<F>
  name: Path<F>
  label?: React.ReactNode
  placeholder?: string
  required?: boolean
  type?: string
  disabled?: boolean
  className?: string
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <label className="flex flex-col gap-2">
            {props.label && (
              <FieldLabel required={props.required}>{props.label}</FieldLabel>
            )}
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                placeholder={props.placeholder}
                className={cn("w-full", props.className)}
                disabled={props.disabled}
                type={props.type}
              />
            </FormControl>
            <FormMessage />
          </label>
        </FormItem>
      )}
    />
  )
}

export function CheckboxField<F extends FieldValues>(props: {
  control: Control<F>
  name: Path<F>
  label: React.ReactNode
  required?: boolean
  disabled?: boolean
  className?: string
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-y-0 space-x-3">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{props.label}</FormLabel>
          </div>
        </FormItem>
      )}
    />
  )
}

export function SwitchField<F extends FieldValues>(props: {
  control: Control<F>
  name: Path<F>
  label: React.ReactNode
  required?: boolean
  border?: boolean
  disabled?: boolean
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <label
            className={cn(
              "flex flex-row items-center gap-2",
              props.border ? "rounded-lg border p-3 shadow-sm" : null,
            )}
          >
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={props.disabled}
              />
            </FormControl>
            <FieldLabel required={props.required}>{props.label}</FieldLabel>
          </label>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function DateField<F extends FieldValues>(props: {
  control: Control<F>
  name: Path<F>
  label?: React.ReactNode
  required?: boolean
  disabled?: boolean
  popoverTrigger?: () => JSX.Element
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {props.label ? (
            <FieldLabel required={props.required}>{props.label}</FieldLabel>
          ) : null}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                {props.popoverTrigger ? (
                  props.popoverTrigger()
                ) : (
                  <Button
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground",
                    )}
                    disabled={props.disabled}
                  >
                    <CalendarIcon className="mr-2 ml-0 size-4 opacity-50" />
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                )}
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export interface SelectFieldProps {
  value: string
  label: string
}

export function SelectField<F extends FieldValues>(props: {
  control: Control<F>
  name: Path<F>
  label?: React.ReactNode
  options: SelectFieldProps[]
  placeholder?: string
  required?: boolean
  disabled?: boolean
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.label ? (
            <FieldLabel required={props.required}>{props.label}</FieldLabel>
          ) : null}
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={props.disabled}
            >
              <SelectTrigger className="my-0 max-w-lg min-w-[160px]">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {props.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export function PasswordField<F extends FieldValues>(props: {
  className?: string
  control: Control<F>
  name: Path<F>
  label: React.ReactNode
  placeholder?: string
  required?: boolean
  type?: string
  disabled?: boolean
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  return (
    <div className="relative space-y-2">
      <InputField
        {...props}
        className={cn(props.className, "pe-9")}
        label={props.label}
        placeholder={props.placeholder}
        type={isVisible ? "text" : "password"}
      />
      <button
        className="text-muted-foreground/80 hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-3 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        aria-controls="password"
      >
        {isVisible ? (
          <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Eye size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
export function AutoResizeTextareaField<F extends FieldValues>(props: {
  className?: string
  control: Control<F>
  name: Path<F>
  label?: React.ReactNode
  placeholder?: string
  required?: boolean
  disabled?: boolean
}) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <label className="flex flex-col gap-2">
            {props.label && (
              <FieldLabel required={props.required}>{props.label}</FieldLabel>
            )}
            <FormControl>
              <AutoResizeTextarea
                {...field}
                className={cn(
                  "bg-background h-auto w-full pr-4 focus:outline-none",
                  props.className,
                )}
                placeholder={props.placeholder}
                disabled={props.disabled}
                required={props.required}
              />
            </FormControl>
            <FormMessage />
          </label>
        </FormItem>
      )}
    />
  )
}
