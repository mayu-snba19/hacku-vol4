import React from 'react'
import BottomBar from '~/components/BottomBar'
import Icon from '~/components/Icon/Icon'
import Meta from '~/components/Meta'

// 優先順 低
const BorrowingPage: React.FC = () => {
  return (
    <>
      <p className="text-center m-5 text-sm">
        <span className="text-red-700">[未実装] </span>
        この機能は今後実装予定です。
      </p>
      <Meta title="借りたいものリスト" />
      <article className="pb-20 min-h-screen">
        <section className="mx-2 my-8">
          <h2 className="bg-brand-400 text-text rounded-md px-4 py-2">
            借りたいものを登録する
          </h2>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault()
            }}
            className="px-4"
          >
            <p className="mt-4 mb-2 text-sm">ものの名前</p>
            <input
              type="text"
              className="mb-4 px-4 py-2 bg-gray-100 w-full rounded-md text-sm border-2 border-brand-400 appearance-none"
              placeholder="マンガ"
            />
            <div className="flex flex-row justify-center">
              <button className="bg-brand-400 text-text px-8 py-2 text-sm rounded-sm text-center">
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
            {Array(15)
              .fill(null)
              .map((_, i) => (
                <section
                  key={i}
                  className="border-t border-gray-200 py-6 pl-6 pr-4 flex flex-row items-center justify-between"
                >
                  <div>
                    <span className="underline">鬼滅の刃全巻</span>
                  </div>
                  <div className="flex flex-row flex-shrink-0 items-center">
                    <button className="p-3 mr-1">
                      <Icon type="edit" />
                    </button>
                    <button className="p-3">
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
