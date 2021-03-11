import React, { ComponentProps } from 'react'
import c from 'classnames'

type Props = {
  onClick?: () => void
  selected?: boolean
} & ComponentProps<'button'>

const Chip: React.FC<Props> = ({
  children,
  onClick,
  selected = true,
  className,
  ...props
}) => {
  return (
    <button
      className={c(
        'px-4 py-1 text-white mx-1 rounded-full active:shadow-none transition',
        selected ? 'bg-brand-400 shadow-md ' : 'bg-gray-300 shadow-none',
        className,
      )}
      aria-pressed={selected}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Chip
