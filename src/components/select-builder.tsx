import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type EnumLike = { [key: string]: string | number}

interface SelectBuilderProps<T extends EnumLike> {
  options: T
  placeholder: string
  value?: string
  onChange?: (value: string) => void
}

export function SelectBuilder<T extends EnumLike>({ options, placeholder, value, onChange }: SelectBuilderProps<T>) {
  const entries = Object.entries(options)
    .filter(([key, _]) => isNaN(Number(key)))
    .map(([_, value]) => ({
      label: String(value),
      value: String(value),
    }))

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {entries.map((option) => (
            <SelectItem key={option.label} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
