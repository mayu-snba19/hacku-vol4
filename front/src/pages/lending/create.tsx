import React, { useState } from 'react'
import c from 'classnames'
import BottomBar from '~/components/BottomBar'
import Meta from '~/components/Meta'
import Icon from '~/components/Icon/Icon'
import { add } from 'date-fns'
import { formatDate } from '~/util/formatDate'
import Modal from '~/components/Modal'
import { useLiff, useLiffAuth } from '~/liff/liffHooks'
import { usePostLendingInfo } from '~/adaptor/lendingInfoHooks'

const DateDefaultOptions = {
  明日: () => add(new Date(), { days: 1 }),
  明後日: () => add(new Date(), { days: 2 }),
  '1週間後': () => add(new Date(), { weeks: 7 }),
  '1ヶ月後': () => add(new Date(), { months: 1 }),
  半年後: () => add(new Date(), { months: 6 }),
  '1年後': () => add(new Date(), { years: 1 }),
}

const CreatePage: React.FC = () => {
  const { liff } = useLiff()
  const { user } = useLiffAuth()
  const postLendingInfo = usePostLendingInfo()
  const [focusingOnField, setFocusingOnField] = useState(false)

  const [content, setContent] = useState('')
  const [deadline, setDeadline] = useState('')

  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false)
  const [isOpenCompleteDialog, setIsOpenCompleteDialog] = useState(false)

  const inputOk = content.length > 0 && deadline.length > 0

  const invokeShareTargetPicker = async () => {
    if (liff == null || user == null) {
      return
    }

    const token = await postLendingInfo({
      content,
      deadline: new Date(deadline),
    })

    if (token == null) return

    await liff.shareTargetPicker([
      {
        type: 'text',
        text: `【返してほしいちゅん】
${user.displayName}さんが「${content}」を貸し出し登録しました。

以下URLから承認してください。
${
  process.env.NEXT_PUBLIC_LIFF_URL
}/borrowing/link?lendingId=${encodeURIComponent(token as string)}`,
      },
    ])
    setIsOpenConfirmDialog(true)
  }

  const handleCompleteRegister = () => {
    setIsOpenCompleteDialog(false)
    setContent('')
    setDeadline('')
  }

  return (
    <>
      <Meta title="貸し出し登録" />
      <article className="pb-20">
        <div className="flex flex-col mt-8">
          <h2 className="bg-brand-400 text-text rounded-md text-sm px-4 py-2 mx-2">
            STEP1. 貸すものと期限を入力するちゅん
          </h2>
          <div className="mx-8 my-8">
            <h3 className="text-sm text-gray-600">何を貸す？</h3>
            <input
              type="text"
              className="mt-2 px-4 py-2 bg-gray-200 w-full rounded-md text-sm"
              placeholder="マンガ"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setFocusingOnField(true)}
              onBlur={() => setFocusingOnField(false)}
            />
            <div
              className={c(
                'flex flex-row justify-end text-sm',
                !(content.length > 0) && 'hidden',
              )}
            >
              <p className="text-brand-600 mr-2">OK</p>
            </div>
            <h3 className="text-sm text-gray-600 mt-8">返却はいつ？</h3>
            <input
              type="date"
              className="mt-2 px-4 py-2 bg-gray-200 w-full rounded-md text-sm"
              placeholder="マンガ"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              onFocus={() => setFocusingOnField(true)}
              onBlur={() => setFocusingOnField(false)}
            />
            <div className="mt-2 flex flex-row overflow-x-scroll whitespace-nowrap">
              {Object.entries(DateDefaultOptions).map(([label, calc]) => (
                <button
                  key={label}
                  className="px-4 py-1 bg-brand-300 text-white mx-1 rounded-sm"
                  onClick={() => setDeadline(formatDate(calc(), 'yyyy-MM-dd'))}
                >
                  {label}
                </button>
              ))}
            </div>
            <div
              className={c(
                'flex flex-row justify-end text-sm',
                !(deadline.length > 0) && 'hidden',
              )}
            >
              <p className="text-brand-600 mr-2">OK</p>
            </div>
          </div>

          <div
            className={c(
              'mx-auto mb-4 transition-all',
              (!inputOk || focusingOnField) && 'opacity-0',
            )}
          >
            <Icon
              type="doubledown"
              className="animate-bounce text-brand-600 text-4xl"
            />
          </div>

          <h2 className="bg-brand-400 text-text rounded-md text-sm px-4 py-2 mx-2 mt-4">
            STEP2. 貸す友達を選択するちゅん
          </h2>
          <h3 className="text-sm text-gray-600 mt-8 mx-8">
            貸す友達にメッセージを送ろう
          </h3>
          <div className="flex flex-row justify-center my-4">
            <button
              className={c(
                'text-text px-12 py-4 text-sm rounded-sm text-center transition-all',
                inputOk ? 'bg-accent-400 shadow-lg' : 'bg-accent-100',
              )}
              disabled={!inputOk}
              onClick={invokeShareTargetPicker}
            >
              友達を選択する
            </button>
          </div>
        </div>
      </article>
      <BottomBar type="create-lending" />
      <Modal
        isOpen={isOpenConfirmDialog}
        positiveLabel="送れた"
        negativeLabel="もう一度送り直す"
        onClickConfirm={() => {
          setIsOpenConfirmDialog(false)
          setIsOpenCompleteDialog(true)
        }}
        onClose={() => setIsOpenConfirmDialog(false)}
      >
        <p className="text-center">友達にメッセージは送れたちゅんか？</p>
      </Modal>
      <Modal
        isOpen={isOpenCompleteDialog}
        positiveLabel="閉じる"
        onClickConfirm={handleCompleteRegister}
        onClose={handleCompleteRegister}
      >
        <p className="text-center">登録完了だちゅん！</p>
      </Modal>
    </>
  )
}

export default CreatePage
