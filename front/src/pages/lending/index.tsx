import { add, differenceInDays } from 'date-fns'
import type { GetServerSideProps } from 'next'
import React, { useState, useEffect, Fragment } from 'react'
import {
  useBorrowingInfo,
  useLendingInfo,
  usePostHaveReturned,
} from '~/adaptor/lendingInfoHooks'
import BottomBar from '~/components/BottomBar'
import HrWithMessage from '~/components/HrWithMessage'
import LendingItemBox from '~/components/LendingItemBox'
import Meta from '~/components/Meta'
import Modal from '~/components/Modal'
import { formatDate } from '~/util/formatDate'

type Props = {
  currentlyCreatedlendingId: string | null
  isFirstVisit: boolean | null
}

const DEADLINE_BORDER = 3

const LendingListPage: React.FC<Props> = ({
  currentlyCreatedlendingId,
  // isFirstVisit,
}) => {
  const [selectedLendingId, setSelectedLendingId] = useState<string | null>()

  const [alertBorderDeadline] = useState(() =>
    add(new Date(), { days: DEADLINE_BORDER }),
  )

  const { data: lendingList } = useLendingInfo()
  const { data: borrowingList } = useBorrowingInfo()
  const postHaveReturned = usePostHaveReturned()

  const [isOpenFirstModal, setIsOpenFirstModal] = useState(false)
  useEffect(() => {
    if (currentlyCreatedlendingId != null) {
      const timer = setTimeout(() => setIsOpenFirstModal(true), 300)
      return () => clearTimeout(timer)
    }
  }, [])

  // TODO: 仮データ
  // const borrowingList = [
  //   {
  //     lendingId: '0003',
  //     content: '微積のノート',
  //     deadline: new Date(2020, 10, 10),
  //     ownerName: '山田太郎',
  //     kind: 'borrowing' as const,
  //   },
  //   {
  //     lendingId: '0004',
  //     content: 'マンガ',
  //     deadline: new Date(2021, 2, 13),
  //     ownerName: '田中次郎',
  //     kind: 'borrowing' as const,
  //   },
  //   {
  //     lendingId: '0005',
  //     content: '微分積分学続論の第10回の授業ノート',
  //     deadline: new Date(2021, 2, 15),
  //     ownerName: '田中次郎',
  //     kind: 'borrowing' as const,
  //   },
  // ]
  // const { data: lendingList } = {
  //   data: [
  //     {
  //       lendingId: '0001',
  //       content: '微積のノート',
  //       deadline: new Date(2021, 2, 14),
  //       borrowerName: '山田太郎',
  //       kind: 'lending' as const,
  //     },
  //     {
  //       lendingId: '0002',
  //       content: '微分積分学続論の第10回の授業ノート',
  //       deadline: new Date(2021, 6, 15),
  //       borrowerName: '田中次郎',
  //       kind: 'lending' as const,
  //     },
  //   ],
  // }

  const handleReturn = async (lendingId: string | null) => {
    if (lendingId == null) {
      return
    }
    await postHaveReturned(lendingId)
  }

  const list = [...(borrowingList ?? []), ...(lendingList ?? [])].sort((a, b) =>
    a.deadline > b.deadline ? 1 : a.deadline < b.deadline ? -1 : 0,
  )

  const borderDeadlineLendingId =
    list.find(
      (lendingInfo) => differenceInDays(lendingInfo.deadline, new Date()) >= 0,
    )?.lendingId ?? list[list.length - 1]?.lendingId

  const alertBorderDeadlineLendingId =
    list.find(
      (lendingInfo) =>
        differenceInDays(lendingInfo.deadline, alertBorderDeadline) >= 0,
    )?.lendingId ?? list[list.length - 1]?.lendingId

  return (
    <>
      <Meta title="貸しているもの一覧" />
      <article className="min-h-screen pb-32">
        <h2 className="mt-8 mb-6 text-center">貸し借り中のもの</h2>
        {list.map((lendingInfo) => (
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
                setSelectedLendingId(lendingInfo.lendingId)
                console.log('click')
              }}
            />
            {lendingInfo.kind === 'lending' ? (
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
            ) : (
              <Modal
                isOpen={selectedLendingId === lendingInfo.lendingId}
                positiveLabel="わかった"
                onClickConfirm={() => setSelectedLendingId(null)}
                onClose={() => setSelectedLendingId(null)}
              >
                <p className="text-center">
                  {lendingInfo.ownerName}さんから{' '}
                  <span className="inline-block underline ">
                    「{lendingInfo.content}」
                  </span>
                  を借りてるちゅん。
                  <br />
                  <span className="inline-block underline ">
                    {formatDate(lendingInfo.deadline)}
                  </span>
                  までに返すちゅん
                </p>
              </Modal>
            )}
          </Fragment>
        ))}
      </article>
      <BottomBar type="lending" />
      <Modal
        isOpen={isOpenFirstModal}
        positiveLabel="わかった"
        onClickConfirm={() => setIsOpenFirstModal(false)}
        onClose={() => setIsOpenFirstModal(false)}
        shouldCloseOnOverlayClick={false}
      >
        <p>
          {'マンガ'}
          の貸し借りを登録したちゅん！この画面から返却期限を確認できるちゅん
        </p>
      </Modal>
    </>
  )
}

export default LendingListPage

type Query = {
  lendingId?: string
  first?: string
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  query,
}) => {
  return {
    props: {
      currentlyCreatedlendingId: query?.lendingId?.toString() ?? null,
      isFirstVisit: query?.first === 'true',
    },
  }
}
