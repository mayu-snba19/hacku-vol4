import React from 'react'
import Icon from '~/components/Icon/Icon'
import { BorrowingInfo, LendingInfo } from '~/types/lendingInfo'
import formatDateDistance from '~/util/formatDateDistance'
import { differenceInDays } from 'date-fns'

type Props = {
  item: LendingInfo | BorrowingInfo
}

/**
 * 何日前から「返却期限が迫っています」の警告を出すか
 */
const ALERT_BORDER = 1

const LendingItemBox: React.FC<Props> = ({ item }) => {
  const remaindDays = differenceInDays(item.deadline, new Date())
  console.log(remaindDays)
  return (
    <section
      className={
        'flex flex-col m-2 px-4 py-2 text-text rounded-md shadow-sm relative overflow-hidden ' +
        (item.kind === 'lending' ? 'bg-brand-400' : 'bg-brand-300')
      }
    >
      <Icon
        type={item.kind === 'lending' ? 'uparrow' : 'downarrow'}
        className={
          'absolute top-0  z-0 opacity-30 ' +
          (item.kind === 'lending'
            ? '-right-6 text-brand-100'
            : '-left-6 text-brand-400')
        }
        width="6rem"
        height="6rem"
      />
      <div className="z-10">
        <h1 className="mt-2">{item.content}</h1>
        {remaindDays < 0 ? (
          <div className="flex flex-row items-center text-red-700 px-2 mt-1">
            <Icon type="alert" className="mr-1" />
            <p className="text-xs">返却期限を過ぎています</p>
          </div>
        ) : (
          item.kind === 'borrowing' &&
          remaindDays <= ALERT_BORDER && (
            <div className="flex flex-row items-center text-red-700 px-2 mt-1">
              <Icon type="alert" className="mr-1" />
              <p className="text-xs">返却期限が迫っています</p>
            </div>
          )
        )}
        <div className="mt-2 flex flex-row justify-between px-2">
          <div className="text-sm flex flex-row items-center">
            <Icon type="user" className="mr-2" />
            <p>
              {item.kind === 'lending' ? item.borrowerName : item.ownerName}
            </p>
          </div>
          <div className="text-sm flex flex-row items-center">
            <Icon type="return" className="mr-2" />
            <p>{formatDateDistance(item.deadline)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LendingItemBox
