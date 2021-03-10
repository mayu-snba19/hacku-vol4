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
        'my-2 w-full',
        item.kind === 'lending' ? 'pr-8 pl-2' : 'pr-2 pl-8',
      )}
    >
      <button
        className={c(
          'flex justify-between flex-row-reverse items-center px-4 py-2 text-text rounded-md shadow-sm w-full',
          'relative overflow-hidden shadow-md active:shadow-none transform active:scale-95 transition-all',
          item.kind === 'lending' ? 'bg-brand-400' : 'bg-brand-300',
        )}
        onClick={onClick}
      >
        <Icon
          type={item.kind === 'lending' ? 'uparrow' : 'downarrow'}
          className={c(
            'absolute z-0 opacity-30',
            item.kind === 'lending'
              ? 'top-0 left-6 text-brand-100'
              : '-bottom-8 right-8 text-brand-400',
          )}
          width="10rem"
          height="10rem"
        />
        <div className="flex flex-col justify-center items-center z-10 w-24">
          <p className={c(isExpired && 'bg-red-700 text-text rounded-md px-2')}>
            {isExpired ? (
              <>
                {formatDateDistance(item.deadline, { addSuffix: false })}
                <span className="text-sm">超過</span>
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
          <p className="text-xs mt-1">{formatDate(item.deadline)}</p>
        </div>
        <div className="flex flex-col items-start z-10">
          <h1 className="mt-2 font-bold text-left">{item.content}</h1>
          {isExpired ? (
            <div
              className={c(
                'flex flex-row items-center text-red-700 px-1 mt-1',
                item.kind === 'lending' ? 'justify-end' : 'justify-start',
              )}
            >
              <Icon type="alert" className="mr-1" />
              <p className="text-xs">返却期限を過ぎています</p>
            </div>
          ) : (
            item.kind === 'borrowing' &&
            remaindDays <= ALERT_BORDER && (
              <div className="flex flex-row items-center text-red-700 px-1 mt-1">
                <Icon type="alert" className="mr-1" />
                <p className="text-xs">返却期限が迫っています</p>
              </div>
            )
          )}
          <div className="mt-2 flex flex-row px-1 text-sm items-center justify-start">
            <Icon type="user" className="mr-2" />
            <p>
              {item.kind === 'lending' ? item.borrowerName : item.ownerName}
            </p>
          </div>
        </div>
      </button>
    </section>
  )
}

export default LendingItemBox
