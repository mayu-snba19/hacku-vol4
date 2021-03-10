import React from 'react'
import c from 'classnames'

type Props = {
  children: string
  color: 'red' | 'black'
}

const HrWithMessage: React.FC<Props> = ({ children, color }) => {
  return (
    <div className="text-center text-xs w-full relative">
      <span
        className={c(
          'relative bg-gray-100 z-10',
          color === 'red' ? 'text-accent-700' : 'text-gray-500',
        )}
      >
        {children}
      </span>
      <hr
        className={c(
          'absolute bottom-1/2 left-1/2 transform -translate-x-1/2 h-0.5 w-11/12 opacity-50',
          color === 'red' ? 'bg-accent-700' : 'bg-gray-500',
        )}
      />
    </div>
  )
}

export default HrWithMessage
