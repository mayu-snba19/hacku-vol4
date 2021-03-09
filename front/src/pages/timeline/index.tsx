import React from 'react'
import BottomBar from '~/components/BottomBar'
import Icon from '~/components/Icon/Icon'
import Meta from '~/components/Meta'
import formatDateDistance from '~/util/formatDateDistance'

const Timeline = () => {
  return (
    <div>
      <Meta title="タイムライン" />
      <article className="pb-20 min-h-screen">
        <div className="px-1 my-8">
          {Array(15)
            .fill(null)
            .map((_, i) => (
              <>
                {i % 4 === 0 && (
                  <h2
                    key={`header-${i}`}
                    className="bg-brand-400 text-text rounded-md sticky top-0 text-sm px-4 py-2"
                  >
                    今日
                  </h2>
                )}
                <section key={i} className="border-t border-gray-200 py-5 px-6">
                  <h3>鬼滅の刃全巻</h3>
                  <div className="mt-2 flex flex-row justify-between px-2">
                    <div className="text-sm flex flex-row items-center">
                      <Icon type="user" className="mr-2" />
                      <p>田中太郎</p>
                    </div>
                    <div className="text-sm flex flex-row items-center">
                      <Icon type="calendar" className="mr-2" />
                      <p>
                        {formatDateDistance(new Date(2021, 4, 3), {
                          addSuffix: false,
                        }) + '前'}
                      </p>
                    </div>
                  </div>
                </section>
              </>
            ))}
        </div>
      </article>
      <BottomBar type="timeline" />
    </div>
  )
}

export default Timeline
