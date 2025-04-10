"use client"

import React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
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
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
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
  showForgotPassword?: boolean
}) {
  return (
    <div className="space-y-2 pb-3.5">
      <div className="relative">
        <InputField
          {...props}
          className={cn(props.className)}
          label={props.label}
          placeholder={props.placeholder}
          type="password"
          required
        />
        {props.showForgotPassword && (
          <Link
            href="/forgot-password"
            className="absolute right-0 -bottom-5 mr-auto inline-block text-xs underline-offset-4 hover:underline"
          >
            Forgot your password?
          </Link>
        )}
      </div>
    </div>
  )
}
