import React, { Fragment, useState } from 'react'
import c from 'classnames'
import { useBorrowingInfo, useLendingInfo } from '~/adaptor/lendingInfoHooks'
import BottomBar from '~/components/BottomBar'
import Chip from '~/components/Chip'
import Icon from '~/components/Icon/Icon'
import Meta from '~/components/Meta'
import Modal from '~/components/Modal'
// import { FriendWantToBorrowList } from '~/types/wantToBorrow'
import {
  useLiff,
  useLiffAuth,
  useLiffShareTargetApiAvailable,
} from '~/liff/liffHooks'
import buildFriendAddMessage from '~/util/buildFriendAddMessage'
import { useFriendsWantToBorrowList } from '~/adaptor/wantToBorrowHooks'
import IllustMessage from '~/components/IllustMessage'

// const friendsList: FriendWantToBorrowList[] = [
//   {
//     friendId: '0001',
//     friendName: '田中太郎',
//     list: [
//       {
//         friendId: '0001',
//         friendName: '田中太郎',
//         wantToBorrowId: '0001',
//         content: '授業ノート',
//       },
//     ],
//   },
//   {
//     friendId: '0002',
//     friendName: '田中次郎',
//     list: [
//       {
//         friendId: '0002',
//         friendName: '田中太郎',
//         wantToBorrowId: '0002',
//         content: '鬼滅の刃',
//       },
//       {
//         friendId: '0002',
//         friendName: '田中太郎',
//         wantToBorrowId: '0004',
//         content: '進撃の巨人',
//       },
//     ],
//   },
//   {
//     friendId: '0003',
//     friendName: '田中三郎',
//     list: [
//       {
//         friendId: '0003',
//         friendName: '田中太郎',
//         wantToBorrowId: '0003',
//         content: '進撃の巨人',
//       },
//     ],
//   },
// ]

const FriendsList = () => {
  const { liff } = useLiff()
  const { user } = useLiffAuth()
  const shareTargetPickerAvailable = useLiffShareTargetApiAvailable()
  const { data: friendsList } = useFriendsWantToBorrowList()
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null)

  const { data: lendingList } = useLendingInfo()
  const { data: borrowingList } = useBorrowingInfo()

  const [showCompleteDialog, setShowCompleteDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleAddFriends = async () => {
    if (!shareTargetPickerAvailable || user == null) {
      return
    }

    try {
      const res = await liff?.shareTargetPicker(
        buildFriendAddMessage(user.userId),
      )
      if (res != null && res.status === 'success') {
        setShowCompleteDialog(true)
      }
    } catch {
      setErrorMessage('エラーが発生しました')
    }
  }

  return (
    <>
      <Meta title="ともだち" />
      <article className="pt-8 pb-20 mx-2 min-h-screen">
        <h2 className="bg-brand-400 text-text rounded-md sticky top-0 px-4 py-2">
          ともだち追加
        </h2>
        <p className="text-sm mx-2 my-4">
          ともだち追加すると、ともだちの借りたい物リストを確認することができます。一度でも貸し借りを行なった人は、自動的にともだちに登録されています。
        </p>
        <div className="flex justify-center">
          <button
            className="text-brand-700 px-4 py-2 text-sm rounded-sm text-center transition-all border-2 border-brand-400"
            onClick={handleAddFriends}
          >
            追加する友達を選ぶ
          </button>
          {errorMessage != null && (
            <p className="text-red-700 text-sm">エラーが発生しました</p>
          )}
        </div>
        <h2 className="bg-brand-400 text-text rounded-md sticky top-0 px-4 py-2 mt-8">
          ともだち一覧
        </h2>
        <div>
          {friendsList?.length === 0 && (
            <IllustMessage>まだ友達は登録されていないチュン</IllustMessage>
          )}
          {friendsList?.map((friendBorrowList) => {
            // FIXME: ユーザー名ベースで判定しているので修正する必要あり
            const lendingCount = lendingList?.filter(
              (item) =>
                item.status === 'concluded' &&
                item.borrowerName === friendBorrowList.friendName,
            ).length
            const borrowingCount = borrowingList?.filter(
              (item) => item.ownerName === friendBorrowList.friendName,
            ).length
            return (
              <Fragment key={friendBorrowList.friendId}>
                <section className="flex flex-col px-2 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="bg-gray-300 rounded-full p-2">
                      <Icon type="icon" className="text-3xl text-white" />
                    </div>
                    <h3 className="ml-2 mr-auto">
                      {friendBorrowList.friendName}
                    </h3>
                    <Chip
                      className={c(
                        'shadow-none text-sm flex ',
                        lendingCount !== 0 ? 'pl-3 pr-1' : 'px-4',
                      )}
                      selected={lendingCount !== 0}
                    >
                      貸し
                      {lendingCount !== 0 && (
                        <div className="ml-1 bg-accent-700 text-text rounded-full w-5 h-5">
                          {lendingCount}
                        </div>
                      )}
                    </Chip>
                    <Chip
                      className={c(
                        'shadow-none text-sm flex',
                        borrowingCount !== 0 ? 'pl-3 pr-1' : 'px-4',
                      )}
                      selected={borrowingCount !== 0}
                    >
                      借り
                      {borrowingCount !== 0 && (
                        <div className="ml-1 bg-accent-700 text-text rounded-full w-5 h-5">
                          {borrowingCount}
                        </div>
                      )}
                    </Chip>
                  </div>
                  <div className="text-center mt-4 mb-2">
                    <button
                      className="link text-sm"
                      onClick={() =>
                        setSelectedFriendId(friendBorrowList.friendId)
                      }
                    >
                      借りたいものリストを見る
                    </button>
                  </div>
                </section>
                <Modal
                  isOpen={selectedFriendId === friendBorrowList.friendId}
                  positiveLabel="とじる"
                  onClickConfirm={() => setSelectedFriendId(null)}
                  onClose={() => setSelectedFriendId(null)}
                >
                  <div className="flex items-center font-sans">
                    <div className="bg-gray-300 rounded-full p-2">
                      <Icon type="icon" className="text-3xl text-white" />
                    </div>
                    <h3 className="ml-2">{friendBorrowList.friendName}</h3>
                  </div>
                  <section className="mt-4 font-sans">
                    <h3 className="bg-brand-400 text-text rounded-md sticky top-0 text-sm px-4 py-2 mx-2">
                      借りたいもの
                    </h3>
                    <ul className="mx-4">
                      {friendBorrowList.list.map((item) => (
                        <li key={item.wantToBorrowId} className="my-2">
                          ・{item.content}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Modal>
              </Fragment>
            )
          })}
        </div>
      </article>
      <BottomBar type="friends" />
      <Modal
        isOpen={showCompleteDialog}
        positiveLabel="OK"
        onClickConfirm={() => setShowCompleteDialog(false)}
        onClose={() => setShowCompleteDialog(false)}
      >
        <p className="text-center leading-8">
          ともだちに招待メッセージを送ったちゅん！！
          <br />
          ともだちが承認してくれるのを待つちゅん！
        </p>
      </Modal>
    </>
  )
}

export default FriendsList
