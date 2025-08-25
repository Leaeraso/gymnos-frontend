"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverPortal } from "@radix-ui/react-popover"
import { formatDateInputValue, formatToBritishDate } from "@/utils/date.utils"

interface CalendarDateProps {
  dateValue: string
  onChange: (date: string) => void
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

export function CalendarDate({ dateValue, onChange }: CalendarDateProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01")
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [value, setValue] = React.useState(formatDate(date))

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder="01/06/2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const formattedValue = formatDateInputValue(e.target.value)
            setValue(formattedValue)

            const date = formatToBritishDate(e.target.value)
            if (isValidDate(date)) {
              setDate(date)
              setMonth(date)
              onChange(formatDate(date))
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverPortal container={document.getElementById('dialog-content') ?? undefined}>
            <PopoverContent
              className="z-[9999] pointer-events-auto w-auto overflow-hidden p-0 bg-background"
              align="end"
              alignOffset={-8}
              sideOffset={10}
              forceMount
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  setDate(date)
                  setValue(formatDate(date))
                  setOpen(false)
                  onChange(formatDate(date))
                }}
              />
            </PopoverContent>
          </PopoverPortal>
        </Popover>
      </div>
    </div>
  )
}
