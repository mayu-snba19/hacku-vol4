import React from 'react'
import Link from 'next/link'

const TailwindExample: React.FC = () => {
  return (
    <div className="m-8">
      <p className="text-6xl font-bold text-red">Hello, ChunChunChun🐦!!</p>
      <div className="my-8">
        <a
          href="https://tailwindcss.com/docs/utility-first"
          className="text-2xl underline"
        >
          Tailwind Docs
        </a>
        <p className="text-red-700">
          ↑ここ参照したらtailwindでのクラス名の書き方がわかります
        </p>
      </div>
      <Link href="/">
        <a>HOME</a>
      </Link>
    </div>
  )
}

export default TailwindExample
