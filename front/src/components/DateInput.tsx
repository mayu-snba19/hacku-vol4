import {
  getDate,
  getDaysInMonth,
  getMonth,
  getYear,
  parse,
  setDay,
  setMonth,
  setYear,
} from 'date-fns'
import React from 'react'
import type { ComponentProps } from 'react'

export type DateString = `${number}-${number}-${number}`

type Props = {
  value: DateString
  onChange: (value: DateString) => void
} & Omit<ComponentProps<'select'>, 'value' | 'onChange'>

const DateInput: React.FC<Props> = ({ value, onChange, ...props }) => {
  const handleChangeYear = (year: string) => {
    onChange(
      `${year}-${value.split('-')?.[1]}-${value.split('-')?.[2]}` as DateString,
    )
  }

  const handleChangeMonth = (month: string) => {
    onChange(
      `${value.split('-')?.[0]}-${month}-${
        value.split('-')?.[2]
      }` as DateString,
    )
  }

  const handleChangeDay = (day: string) => {
    onChange(
      `${value.split('-')?.[0]}-${value.split('-')?.[1]}-${day}` as DateString,
    )
  }

  return (
    <div className="flex flex-row">
      <select
        className="mt-2 px-4 py-2 bg-gray-200 w-full rounded-md text-sm"
        value={parseInt(value.split('-')?.[0] ?? '2021', 10)}
        onChange={(e) => handleChangeYear(e.target.value)}
        {...props}
      >
        {Array(10)
          .fill(null)
          .map((_, i) => i + new Date().getFullYear())
          .map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
      </select>
      <div className="flex flex-col justify-end ml-1 mr-2 mb-1">年</div>

      <select
        className="mt-2 px-4 py-2 bg-gray-200 w-full rounded-md text-sm"
        value={parseInt(value.split('-')?.[1] ?? '1', 10)}
        onChange={(e) => handleChangeMonth(e.target.value)}
        {...props}
      >
        {Array(12)
          .fill(null)
          .map((_, i) => i + 1)
          .map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
      </select>
      <div className="flex flex-col justify-end ml-1 mr-2 mb-1">月</div>

      <select
        className="mt-2 px-4 py-2 bg-gray-200 w-full rounded-md text-sm"
        value={parseInt(value.split('-')?.[2] ?? '1', 10)}
        onChange={(e) => handleChangeDay(e.target.value)}
        {...props}
      >
        {Array(getDaysInMonth(new Date('2021-03-10')))
          .fill(null)
          .map((_, i) => i + 1)
          .map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
      </select>
      <div className="flex flex-col justify-end ml-1 mr-2 mb-1">日</div>
    </div>
  )
}

export default DateInput
