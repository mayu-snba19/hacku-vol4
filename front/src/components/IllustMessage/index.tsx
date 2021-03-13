import React from 'react'
import Image from 'next/image'

const IllustMessage: React.FC = ({ children }) => {
  return (
    <div className="mt-16 mx-4">
      <div
        className="rounded-full overflow-hidden mx-auto"
        style={{ width: '200px', height: '200px' }}
      >
        <Image src="/suzume.jpg" width="200px" height="200px" />
      </div>
      <p className="mt-8 text-center text-gray-500">{children}</p>
    </div>
  )
}

export default IllustMessage
