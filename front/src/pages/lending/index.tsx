import { add, isAfter, isBefore } from 'date-fns'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState, useEffect, Fragment } from 'react'
import {
  useBorrowingInfo,
  useLendingInfo,
  usePostHaveReturned,
} from '~/adaptor/lendingInfoHooks'
import BottomBar from '~/components/BottomBar'
import Chip from '~/components/Chip'
import HrWithMessage from '~/components/HrWithMessage'
import Icon from '~/components/Icon/Icon'
import LendingItemBox from '~/components/LendingItemBox'
import Meta from '~/components/Meta'
import Modal from '~/components/Modal'
import { BorrowingInfo, ConcludedLendingInfo } from '~/types/lendingInfo'
import { formatDate } from '~/util/formatDate'

type Filter = 'both' | 'lending' | 'borrowing'

type Props = {
  currentlyCreatedlendingId: string | null
  isFirstVisit: boolean | null
}

const DEADLINE_BORDER = 3

const LendingListPage: React.FC<Props> = ({
  currentlyCreatedlendingId,
  // isFirstVisit,
}) => {
  const router = useRouter()
  const filter: Filter =
    router.query.filter == null
      ? 'both'
      : router.query.filter === 'lending'
      ? 'lending'
      : router.query.filter === 'borrowing'
      ? 'borrowing'
      : 'both'

  const [selectedLendingId, setSelectedLendingId] = useState<string | null>()

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
  // const borrowingList: BorrowingInfo[] = [
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
  // const lendingList: LendingInfo[] = [
  //   {
  //     lendingId: '0001',
  //     content: '微積のノート',
  //     deadline: new Date(2021, 2, 14),
  //     borrowerName: '山田太郎',
  //     kind: 'lending' as const,
  //     status: 'concluded' as const,
  //   },
  //   {
  //     lendingId: '0002',
  //     content: '微分積分学続論の第10回の授業ノート',
  //     deadline: new Date(2021, 6, 15),
  //     kind: 'lending' as const,
  //     status: 'waiting' as const,
  //   },
  // ]

  const handleReturn = async (lendingId: string | null) => {
    if (lendingId == null) {
      return
    }
    await postHaveReturned(lendingId)
  }

  const list = [...(borrowingList ?? []), ...(lendingList ?? [])]
    .filter(
      (item): item is ConcludedLendingInfo | BorrowingInfo =>
        (item.kind === 'lending' && item.status === 'concluded') ||
        item.kind === 'borrowing',
    )
    .filter((item) => filter === 'both' || filter === item.kind)
    .sort((a, b) =>
      a.deadline > b.deadline ? 1 : a.deadline < b.deadline ? -1 : 0,
    )

  const borderDeadlineLendingIndex =
    list.findIndex((lendingInfo) =>
      isAfter(lendingInfo.deadline, new Date()),
    ) ?? null
  const borderDeadlineLendingId =
    borderDeadlineLendingIndex === 0
      ? null
      : list[borderDeadlineLendingIndex]?.lendingId

  const alertBorderDeadlineLendingIndex =
    list.findIndex((lendingInfo) =>
      isAfter(lendingInfo.deadline, add(new Date(), { days: DEADLINE_BORDER })),
    ) ?? null

  const alertBorderDeadlineLendingId =
    alertBorderDeadlineLendingIndex === 0 ||
    alertBorderDeadlineLendingIndex === borderDeadlineLendingIndex
      ? null
      : list[alertBorderDeadlineLendingIndex]?.lendingId

  return (
    <>
      <Meta title="かしかり記録" />
      <article className="pt-4 pb-36">
        {/* <h2 className="mb-6 text-center">貸し借り中のもの</h2> */}
        <nav className="flex justify-center items-center flex-wrap py-2 sticky top-0 z-30 bg-gray-100">
          <Chip
            className="mx-2 mt-1 flex items-center"
            selected={filter === 'both'}
            onClick={() =>
              router.push('/lending?filter=both', '/lending?filter=both', {
                shallow: true,
              })
            }
          >
            貸し借り
          </Chip>
          <Chip
            className="mx-2 mt-1 flex items-center"
            selected={filter === 'lending'}
            onClick={() =>
              router.push(
                '/lending?filter=lending',
                '/lending?filter=lending',
                { shallow: true },
              )
            }
          >
            <Icon type="uparrow" className="mr-1" /> 貸し
          </Chip>
          <Chip
            className="mx-2 mt-1 flex items-center"
            selected={filter === 'borrowing'}
            onClick={() =>
              router.push(
                '/lending?filter=borrowing',
                '/lending?filter=borrowing',
                { shallow: true },
              )
            }
          >
            <Icon type="downarrow" className="mr-1" /> 借り
          </Chip>
        </nav>
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
                  を借りてるチュン。
                  <br />
                  {isBefore(new Date(), lendingInfo.deadline) ? (
                    <>
                      <span className="inline-block underline ">
                        {formatDate(
                          lendingInfo.deadline,
                          'yyyy年M月d日（ccc）',
                        )}
                      </span>
                      までに返すチュン。
                    </>
                  ) : (
                    <>
                      返却期限
                      <span className="inline-block underline mx-1">
                        {formatDate(lendingInfo.deadline)}
                      </span>
                      が過ぎてるチュン。早く返すチュン。
                    </>
                  )}
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
