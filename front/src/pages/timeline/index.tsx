import React, { Fragment } from 'react'
import { useLWantToBorrowList } from '~/adaptor/wantToBorrowHooks'
import Icon from '~/components/Icon/Icon'
import Meta from '~/components/Meta'

const Timeline = () => {
  const { data: wantToBorrowList } = useLWantToBorrowList()

  return (
    <div>
      <p className="text-center m-5 text-sm">
        <span className="text-red-700">[未実装] </span>
        この機能は今後実装予定です。
      </p>
      <Meta title="タイムライン" />
      <article className="pb-20 min-h-screen">
        <div className="px-1 my-8">
          {wantToBorrowList?.map((friendWantToBorrowList) => (
            <Fragment key={friendWantToBorrowList.friendId}>
              <h2 className="bg-brand-400 text-text rounded-md sticky top-0 text-sm px-4 py-2">
                {friendWantToBorrowList.friendName}
              </h2>
              {friendWantToBorrowList.list.map((item) => (
                <section
                  key={item.wantToBorrowId}
                  className="border-t border-gray-200 py-5 px-6"
                >
                  <h3>{item.content}</h3>
                  <div className="mt-2 flex flex-row justify-between px-2">
                    <div className="text-sm flex flex-row items-center">
                      <Icon type="user" className="mr-2" />
                      <p>{item.friendName}</p>
                    </div>
                    {/* <div className="text-sm flex flex-row items-center">
                      <Icon type="calendar" className="mr-2" />
                      <p>{formatDateDistance(new Date(2021, 4, 3)) + '前'}</p>
                    </div> */}
                  </div>
                </section>
              ))}
            </Fragment>
          ))}
        </div>
      </article>
      {/* <BottomBar type="timeline" /> */}
    </div>
  )
}

export default Timeline
