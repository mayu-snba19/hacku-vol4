import React from 'react'

interface Props {
  children: string
  onClick: () => void
}

const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button className="p-8 bg-red-400 text-white" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
