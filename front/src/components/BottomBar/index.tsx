import React from 'react'
import Icon from '~/components/Icon/Icon'
import c from 'classnames'
import Link from 'next/link'

export type PageType =
  | 'create-lending'
  | 'lending'
  | 'want-to-borrow'
  | 'friends'

export type Props = {
  type: PageType
}

type ItemProps = {
  Icon: React.ReactElement
  label: string
  isActive: boolean
  url: string
}

const BottomBarItem: React.FC<ItemProps> = ({ Icon, label, isActive, url }) => {
  return (
    <Link href={url}>
      <a
        className={c(
          'flex-1 flex flex-col items-center justify-center mx-1 my-2 py-2 rounded-md transition-all',
          isActive ? 'bg-gray-100 text-accent-400' : 'bg-brand-400 text-text',
        )}
      >
        {Icon}
        <p className={c('text-xs mt-1', isActive && 'font-bold')}>{label}</p>
      </a>
    </Link>
  )
}

const BottomBar: React.FC<Props> = ({ type }) => {
  return (
    <nav
      className="fixed bottom-0 w-screen flex flex-row items-center bg-brand-400
        shadow-up z-30 pb-iosb pl-iosl pr-iosr"
    >
      <BottomBarItem
        Icon={<Icon type="uparrow" className="text-2xl" />}
        label="貸す"
        isActive={type === 'create-lending'}
        url="/lending/create"
      />
      <BottomBarItem
        Icon={<Icon type="present" className="text-2xl" />}
        label="かしかり記録"
        isActive={type === 'lending'}
        url="/lending"
      />
      <BottomBarItem
        Icon={<Icon type="list" className="text-2xl" />}
        label="借りたい"
        isActive={type === 'want-to-borrow'}
        url="/want-to-borrow"
      />
      <BottomBarItem
        Icon={<Icon type="friends" className="text-2xl" />}
        label="ともだち"
        isActive={type === 'friends'}
        url="/friends"
      />
    </nav>
  )
}

export default BottomBar
