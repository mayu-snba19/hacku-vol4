import React from 'react'
import c from 'classnames'
import Icon from '~/components/Icon/Icon'
import { BorrowingInfo, LendingInfo } from '~/types/lendingInfo'
import { formatDateDistance, formatDate } from '~/util/formatDate'
import { differenceInDays } from 'date-fns'

type Props = {
  item: LendingInfo | BorrowingInfo
  onClick?: () => void
}

/**
 * 何日前から「返却期限が迫っています」の警告を出すか
 */
const ALERT_BORDER = 1

const LendingItemBox: React.FC<Props> = ({ item, onClick }) => {
  const remaindDays = differenceInDays(item.deadline, new Date())
  const isExpired = remaindDays < 0
  return (
    <section
      className={c(
        'my-4 w-full flex justify-between min-h-36',
        item.kind === 'lending' ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <div className="flex flex-col justify-center items-center z-10 min-w-32 px-4">
        <p
          className={c(
            isExpired
              ? 'bg-red-700 text-text rounded-md px-2 font-extrabold animate-pulse'
              : 'font-medium',
          )}
        >
          {isExpired ? (
            <>
              <span className="whitespace-nowrap">
                {formatDateDistance(item.deadline, { addSuffix: false })}
              </span>
              <span className="text-sm whitespace-nowrap">超過</span>
            </>
          ) : (
            <>
              <span className="text-sm">あと</span>
              {formatDateDistance(item.deadline, {
                addSuffix: false,
              })}
            </>
          )}
        </p>
        <p className="text-xs mt-2">{formatDate(item.deadline)}</p>
      </div>
      <button
        className={c(
          'flex flex-col justify-center py-6 text-text shadow-sm w-full',
          'relative overflow-hidden shadow-md active:shadow-none transform active:opacity-70 transition-all',
          item.kind === 'lending'
            ? 'bg-brand-400 rounded-r-md items-end pl-3 pr-6 animate-slidein-l'
            : 'bg-brand-300 rounded-l-md items-start pl-6 pr-3 animate-slidein-r',
        )}
        onClick={onClick}
      >
        <Icon
          type={item.kind === 'lending' ? 'uparrow' : 'downarrow'}
          className={c(
            'absolute z-0 opacity-30',
            item.kind === 'lending'
              ? 'top-0 left-6 text-brand-100'
              : '-bottom-8 right-2 text-brand-400',
          )}
          width="10rem"
          height="10rem"
        />
        <h1
          className={c(
            'mt-2 font-bold z-10',
            item.kind === 'lending' ? 'text-right' : 'text-left',
          )}
        >
          {item.content}
        </h1>
        {isExpired ? (
          <div
            className={c(
              'flex flex-row items-start text-red-700 px-1 mt-1 z-10',
              item.kind === 'lending' ? 'justify-end' : 'justify-start',
            )}
          >
            <Icon type="alert" className="mr-1" />
            <p className="text-xs text-left">返却期限を過ぎています</p>
          </div>
        ) : (
          item.kind === 'borrowing' &&
          remaindDays <= ALERT_BORDER && (
            <div className="flex flex-row items-start text-red-700 px-1 mt-1 z-10">
              <Icon type="alert" className="mr-1" />
              <p className="text-xs text-left">返却期限が迫っています</p>
            </div>
          )
        )}
        <div className="mt-2 flex flex-row px-1 text-sm items-center justify-start z-10">
          <Icon type="user" className="mr-2" />
          <p>{item.kind === 'lending' ? item.borrowerName : item.ownerName}</p>
        </div>
      </button>
    </section>
  )
}

export default LendingItemBox
