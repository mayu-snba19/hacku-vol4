import { add, getDaysInMonth } from 'date-fns'
import React, { useState } from 'react'
import type { ComponentProps } from 'react'
import c from 'classnames'
import { formatDate } from '~/util/formatDate'
import Chip from './Chip'

const DateDefaultOptions = {
  明日: () => add(new Date(), { days: 1 }),
  明後日: () => add(new Date(), { days: 2 }),
  '1週間後': () => add(new Date(), { days: 7 }),
  '1ヶ月後': () => add(new Date(), { months: 1 }),
  半年後: () => add(new Date(), { months: 6 }),
  '1年後': () => add(new Date(), { years: 1 }),
}

export type DateString = `${number}-${number}-${number}`

type Props = {
  value: DateString
  onChange: (value: DateString) => void
} & Omit<ComponentProps<'select'>, 'value' | 'onChange'>

const DateInput: React.FC<Props> = ({ value, onChange, ...props }) => {
  const [selectedOption, setSelectedOption] = useState<
    'input' | '明日' | '明後日' | '1週間後' | '1ヶ月後' | '半年後' | '1年後'
  >('input')

  const handleChangeYear = (year: string) => {
    onChange(
      `${year}-${value.split('-')?.[1]}-${value.split('-')?.[2]}` as DateString,
    )
    setSelectedOption('input')
  }

  const handleChangeMonth = (month: string) => {
    onChange(
      `${value.split('-')?.[0]}-${month}-${
        value.split('-')?.[2]
      }` as DateString,
    )
    setSelectedOption('input')
  }

  const handleChangeDay = (day: string) => {
    onChange(
      `${value.split('-')?.[0]}-${value.split('-')?.[1]}-${day}` as DateString,
    )
    setSelectedOption('input')
  }

  return (
    <>
      <div className="flex flex-row">
        <select
          className={c(
            'mt-2 px-4 py-2 w-full rounded-md border-2',
            selectedOption === 'input'
              ? 'border-brand-400 bg-gray-100'
              : 'bg-gray-100',
          )}
          value={parseInt(value.split('-')?.[0] ?? '2021', 10)}
          onChange={(e) => handleChangeYear(e.target.value)}
          {...props}
          onFocus={(...args) => {
            setSelectedOption('input')
            props?.onFocus?.(...args)
          }}
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
          className={c(
            'mt-2 px-4 py-2 w-full rounded-md border-2',
            selectedOption === 'input'
              ? 'border-brand-400 bg-gray-100'
              : 'bg-gray-100',
          )}
          value={parseInt(value.split('-')?.[1] ?? '1', 10)}
          onChange={(e) => handleChangeMonth(e.target.value)}
          {...props}
          onFocus={(...args) => {
            setSelectedOption('input')
            props?.onFocus?.(...args)
          }}
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
          className={c(
            'mt-2 px-4 py-2 w-full rounded-md border-2',
            selectedOption === 'input'
              ? 'border-brand-400 bg-gray-100'
              : 'bg-gray-100',
          )}
          value={parseInt(value.split('-')?.[2] ?? '1', 10)}
          onChange={(e) => handleChangeDay(e.target.value)}
          {...props}
          onFocus={(...args) => {
            setSelectedOption('input')
            props?.onFocus?.(...args)
          }}
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
      <div
        className={c(
          'my-4 py-3 flex flex-row overflow-x-scroll whitespace-nowrap border-2 rounded-md',
          selectedOption === 'input' ? 'border-gray-300' : 'border-brand-400',
        )}
      >
        {Object.entries(DateDefaultOptions).map(([label, calc]) => (
          <Chip
            key={label}
            className="mx-1"
            selected={selectedOption === label}
            onClick={() => {
              onChange(formatDate(calc(), 'yyyy-MM-dd') as DateString)
              setSelectedOption(label as keyof typeof DateDefaultOptions)
            }}
          >
            {label}
          </Chip>
        ))}
      </div>
    </>
  )
}

export default DateInput
