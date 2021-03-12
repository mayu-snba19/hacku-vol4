import React, { Fragment, useState } from 'react'
import { useLendingInfo, usePostHaveReturned } from '~/adaptor/lendingInfoHooks'
import HrWithMessage from '~/components/HrWithMessage'
import Icon from '~/components/Icon/Icon'
import LendingItemBox from '~/components/LendingItemBox'
import Meta from '~/components/Meta'
import Modal from '~/components/Modal'
import { ConcludedLendingInfo } from '~/types/lendingInfo'

const ReturnPage = () => {
  // const { data: lendingList } = useLendingInfo()
  const [selectedLendingId, setSelectedLendingId] = useState<string | null>(
    null,
  )

  const postHaveReturned = usePostHaveReturned()

  const lendingList: ConcludedLendingInfo[] = [
    {
      lendingId: '0001',
      content: '微積のノート',
      deadline: new Date(2021, 2, 14),
      borrowerName: '山田太郎',
      kind: 'lending' as const,
      status: 'concluded' as const,
    },
    {
      lendingId: '0002',
      content: '微分積分学続論の第10回の授業ノート',
      deadline: new Date(2021, 6, 15),
      kind: 'lending' as const,
      borrowerName: '山田太郎2',
      status: 'concluded' as const,
    },
    {
      lendingId: '0003',
      content: '微積のノート',
      deadline: new Date(2021, 2, 14),
      borrowerName: '山田太郎',
      kind: 'lending' as const,
      status: 'concluded' as const,
    },
    {
      lendingId: '0004',
      content: '微分積分学続論の第10回の授業ノート',
      deadline: new Date(2021, 6, 15),
      kind: 'lending' as const,
      borrowerName: '山田太郎2',
      status: 'concluded' as const,
    },
    {
      lendingId: '0005',
      content: '微積のノート',
      deadline: new Date(2021, 2, 14),
      borrowerName: '山田太郎',
      kind: 'lending' as const,
      status: 'concluded' as const,
    },
    {
      lendingId: '0006',
      content: '微分積分学続論の第10回の授業ノート',
      deadline: new Date(2021, 6, 15),
      kind: 'lending' as const,
      borrowerName: '山田太郎2',
      status: 'concluded' as const,
    },
  ]

  const selectedLendingInfo = lendingList.find(
    (lendingInfo) => lendingInfo.lendingId === selectedLendingId,
  )

  // const list = (lendingList ?? [])
  //   .filter((item): item is ConcludedLendingInfo => item.status === 'concluded')
  //   .sort((a, b) =>
  //     a.deadline > b.deadline ? 1 : a.deadline < b.deadline ? -1 : 0,
  //   )

  // const handleReturn = async (lendingId: string) => {
  //   await postHaveReturned(lendingId)
  // }

  return (
    <>
      <Meta title="返却の登録" />
      <article className="pt-4 min-h-screen">
        <h2 className="bg-brand-400 text-text rounded-md text-md px-4 py-2 mx-2 mb-4">
          返却されたものを選んでね
        </h2>
        <div className="max-h-80 p-4 overflow-y-hidden overflow-y-scroll relative">
          <div className="top-0 " />
          {lendingList.map((lendingInfo) => (
            <button
              key={lendingInfo.lendingId}
              className="py-2 my-2 flex bg-gray-200 rounded-md px-2 w-full"
              onClick={() => setSelectedLendingId(lendingInfo.lendingId)}
            >
              <Icon
                type="check"
                className="text-xl mr-2 flex-shrink-0 mt-0.5"
              />
              <p className="text-left">
                {lendingInfo.content}（{lendingInfo.borrowerName}さん）
              </p>
            </button>
          ))}
        </div>

        <div className="m-4 p-4 text-center leading-9">
          <span className="underline">
            {selectedLendingInfo?.borrowerName}さん
          </span>
          <br />
          に貸していた
          <br />
          <span className="underline">{selectedLendingInfo?.content}</span>
          <br />
          を返却登録しますか？
        </div>
        {/* <select
          className="mt-2 px-4 py-2 w-full rounded-md border-2 border-brand-400 bg-gray-100"
          value={selectedLendingId ?? undefined}
          onChange={(e) => setSelectedLendingId(e.target.value)}
        >
          {lendingList.map((lendingInfo) => (
            <option key={lendingInfo.lendingId} value={lendingInfo.lendingId}>
              {lendingInfo.content}（{lendingInfo.borrowerName}さん）
            </option>
          ))}
        </select> */}
        {/* {list.map((lendingInfo) => (
          <Fragment key={lendingInfo.lendingId}>
            {lendingInfo.lendingId === borderDeadlineLendingId && (
              <HrWithMessage color="red" className="mt-3 mb-4">
                ▲ 返却期限が過ぎています
              </HrWithMessage>
            )}
            {lendingInfo.lendingId === alertBorderDeadlineLendingId && (
              <HrWithMessage color="black" className="mt-3 mb-4">
                ▲ 返却期限が近づいています
              </HrWithMessage>
            )}
            <LendingItemBox
              key={lendingInfo.lendingId}
              item={lendingInfo}
              onClick={() => {
                // setSelectedLendingId(lendingInfo.lendingId)
                console.log('click')
              }}
            />

            <Modal
              isOpen={selectedLendingId === lendingInfo.lendingId}
              positiveLabel="返却された"
              negativeLabel="まだ"
              onClickConfirm={() => handleReturn(lendingInfo.lendingId)}
              onClose={() => setSelectedLendingId(null)}
              shouldCloseOnOverlayClick={false}
            >
              <p>
                {lendingInfo.borrowerName} さんに貸していた{' '}
                <span className="inline-block underline ">
                  「{lendingInfo.content}」
                </span>
                は返却されたちゅんか？
              </p>
            </Modal>
          </Fragment>
        ))
        } */}
      </article>
    </>
  )
}

export default ReturnPage
