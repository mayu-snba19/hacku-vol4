import React, { useRef, useState } from 'react'
import c from 'classnames'
import BottomBar from '~/components/BottomBar'
import Meta from '~/components/Meta'
import Icon from '~/components/Icon/Icon'
import { format } from 'date-fns'
import { formatDate } from '~/util/formatDate'
import Modal from '~/components/Modal'
import { useLiff, useLiffAuth } from '~/liff/liffHooks'
import { usePostLendingInfo } from '~/adaptor/lendingInfoHooks'
import DateInput, { DateString } from '~/components/DateInput'
import buildLiffLinkMessage from '~/util/generateLiffLinkMessage'
import LendingToken from '~/types/lendingToken'

const CreatePage: React.FC = () => {
  const { liff } = useLiff()
  const { user } = useLiffAuth()
  const postLendingInfo = usePostLendingInfo()
  const [focusingOnField, setFocusingOnField] = useState(false)

  const [content, setContent] = useState('')
  const [deadline, setDeadline] = useState<DateString>(
    () => format(new Date(), 'yyyy-MM-dd') as DateString,
  )

  const [isOpenRetryDialog, setIsOpenRetryDialog] = useState(false)
  const [isOpenCompleteDialog, setIsOpenCompleteDialog] = useState(false)
  const tokenRef = useRef<LendingToken>()

  const inputOk = content.length > 0 && deadline.length > 0

  const invokeShareTargetPicker = async () => {
    if (liff == null || user == null) {
      return
    }

    try {
      const token =
        tokenRef.current ??
        (await postLendingInfo({
          content,
          deadline: new Date(deadline),
        }))

      if (token == null) return

      tokenRef.current = token

      const res = await liff.shareTargetPicker([
        {
          type: 'text',
          text: buildLiffLinkMessage(token, user.displayName, content),
        },
      ])

      if (res != null && res.status === 'success') {
        setIsOpenCompleteDialog(true)
      }
    } catch {
      setIsOpenRetryDialog(true)
    }
  }

  const handleRetry = () => {
    setIsOpenRetryDialog(false)
    invokeShareTargetPicker()
  }

  const handleCompleteRegister = () => {
    setIsOpenCompleteDialog(false)
    setContent('')
    setDeadline(formatDate(new Date(), 'yyyy-MM-dd') as DateString)
  }

  return (
    <>
      <Meta title="貸し出し登録" />
      <article className="pb-20 min-h-screen">
        <div className="flex flex-col mt-8">
          <h2 className="bg-brand-400 text-text rounded-md text-md px-4 py-2 mx-2">
            STEP1. 貸すものと期限を入力するちゅん
          </h2>
          <div className="mx-8 my-8">
            <h3 className="text-gray-600">何を貸す？</h3>
            <input
              type="text"
              className={c(
                'mt-2 px-4 py-2 w-full rounded-md shadow-none appearance-none border-2 border-brand-400',
                content.length > 0
                  ? 'border-brand-400 bg-gray-100'
                  : 'bg-gray-100',
              )}
              placeholder="マンガ"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setFocusingOnField(true)}
              onBlur={() => setFocusingOnField(false)}
            />
            <div
              className={c(
                'flex flex-row justify-end text-sm mt-2',
                !(content.length > 0) && 'opacity-20',
              )}
            >
              <p className="text-brand-600 mr-2 text-xl">
                <Icon type="check" />
              </p>
            </div>
            <h3 className="text-gray-600 mt-8">返却はいつ？</h3>
            <DateInput
              value={deadline}
              onChange={(date) => setDeadline(date)}
            />
            <div
              className={c(
                'flex flex-row justify-end text-sm',
                !(deadline.length > 0) && 'opacity-20',
              )}
            >
              <p className="text-brand-600 mr-2 text-xl">
                <Icon type="check" />
              </p>
            </div>
          </div>

          {inputOk && !focusingOnField && (
            <div className={c('mx-auto mb-4 transition-all')}>
              <Icon
                type="doubledown"
                className="animate-bounce text-brand-600 text-4xl"
              />
            </div>
          )}

          <h2 className="bg-brand-400 text-text rounded-md text-md px-4 py-2 mx-2 mt-4">
            STEP2. 貸す友達を選択するちゅん
          </h2>
          <h3 className="text-gray-600 mt-8 mx-8">
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
        isOpen={isOpenRetryDialog}
        positiveLabel="もう一度送り直す"
        negativeLabel="キャンセル"
        onClickConfirm={handleRetry}
        onClose={() => setIsOpenRetryDialog(false)}
        shouldCloseOnOverlayClick={false}
      >
        <p className="text-center">エラーが発生したチュン</p>
      </Modal>

      <Modal
        isOpen={isOpenCompleteDialog}
        positiveLabel="閉じる"
        onClickConfirm={handleCompleteRegister}
        onClose={handleCompleteRegister}
        shouldCloseOnOverlayClick={false}
      >
        <p className="text-center">登録完了だちゅん！</p>
      </Modal>
    </>
  )
}

export default CreatePage
