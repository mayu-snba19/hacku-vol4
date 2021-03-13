import React, { useState } from 'react'
import c from 'classnames'
import {
  useDeleteWantToBorrowItem,
  usePostWantToBorrowItem,
  useWantToBorrowList,
} from '~/adaptor/wantToBorrowHooks'
import BottomBar from '~/components/BottomBar'
import Icon from '~/components/Icon/Icon'
import Meta from '~/components/Meta'

// 優先順 低
const BorrowingPage: React.FC = () => {
  const { data: wantToBorrowList, revalidate } = useWantToBorrowList()
  const postWantToBorrowItem = usePostWantToBorrowItem()
  const deleteWantToBorrowItem = useDeleteWantToBorrowItem()
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmitWantToBorrowItem = async () => {
    setIsLoading(true)
    await postWantToBorrowItem({ content })
    setIsLoading(false)
    revalidate()
    setContent('')
  }

  const handleDeleteWantToBorrowItem = async (wantToBorrowId: string) => {
    await deleteWantToBorrowItem(wantToBorrowId)
    revalidate()
  }
  return (
    <>
      <Meta title="借りたいものリスト" />
      <article className="pb-20 min-h-screen">
        <section className="mx-2 my-8">
          <h2 className="bg-brand-400 text-text rounded-md px-4 py-2">
            借りたいものを登録する
          </h2>
          <form
            action=""
            onSubmit={(e) => {
              console.log('SUBMIT')
              e.preventDefault()
              handleSubmitWantToBorrowItem()
            }}
            className="px-4"
          >
            <p className="mt-4 mb-2 text-sm">ものの名前</p>
            <input
              type="text"
              className="mb-4 px-4 py-2 bg-gray-100 w-full rounded-md text-sm border-2 border-brand-400 appearance-none"
              placeholder="マンガ / ジュース奢る（お礼）"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex flex-row justify-center">
              <button
                type="submit"
                className={c(
                  'text-text px-8 py-2 text-sm rounded-sm text-center',
                  !isLoading && content.length > 0
                    ? 'bg-brand-400'
                    : 'bg-brand-100',
                )}
                disabled={content.length === 0 || isLoading}
              >
                登録
              </button>
            </div>
          </form>
        </section>

        <section>
          <h2 className="bg-brand-400 text-text rounded-md px-4 py-2 mx-2">
            登録済み
          </h2>
          <div className="px-1">
            {wantToBorrowList?.map((item) => (
              <section
                key={item.wantToBorrowId}
                className="border-t border-gray-200 py-6 pl-6 pr-4 flex flex-row items-center justify-between"
              >
                <div>
                  <span className="underline">{item.content}</span>
                </div>
                <div className="flex flex-row flex-shrink-0 items-center">
                  <button className="p-3 mr-1 text-gray-300" disabled>
                    <Icon type="edit" />
                  </button>
                  <button
                    className="p-3"
                    onClick={() =>
                      handleDeleteWantToBorrowItem(item.wantToBorrowId)
                    }
                  >
                    <Icon type="trash" />
                  </button>
                </div>
              </section>
            ))}
          </div>
        </section>
      </article>
      <BottomBar type="want-to-borrow" />
    </>
  )
}

export default BorrowingPage
