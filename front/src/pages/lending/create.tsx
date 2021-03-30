import React, { useState } from 'react'
import c from 'classnames'
import BottomBar from '~/components/BottomBar'
import Meta from '~/components/Meta'
import Icon from '~/components/Icon/Icon'
import { format } from 'date-fns'
import { formatDate } from '~/util/formatDate'
import Modal from '~/components/Modal'
import {
  useLiff,
  useLiffAuth,
  useLiffShareTargetApiAvailable,
} from '~/liff/liffHooks'
import {
  usePostLendingInfo,
  usePutLendingProcessFinished,
} from '~/adaptor/lendingInfoHooks'
import DateInput, { DateString } from '~/components/DateInput'
import buildLiffLinkMessage from '~/util/buildLiffLinkMessage'
import HrWithMessage from '~/components/HrWithMessage'

const CreatePage: React.FC = () => {
  const { liff } = useLiff()
  const shareTargetPickerAvailable = useLiffShareTargetApiAvailable()
  const { user } = useLiffAuth()
  const postLendingInfo = usePostLendingInfo()
  const putLendingProcessFinished = usePutLendingProcessFinished()
  const [focusingOnField, setFocusingOnField] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState('')
  const [deadline, setDeadline] = useState<DateString>(
    () => format(new Date(), 'yyyy-MM-dd') as DateString,
  )
  const resetForm = () => {
    setContent('')
    setDeadline(formatDate(new Date(), 'yyyy-MM-dd') as DateString)
  }

  const [isOpenRetryDialog, setIsOpenRetryDialog] = useState(false)
  const [isOpenCompleteDialog, setIsOpenCompleteDialog] = useState(false)
  const inputOk = content.length > 0 && deadline.length > 0

  const sendLendingInfo = async () => {
    if (liff == null || user == null) {
      return
    }

    setIsLoading(true)

    try {
      const token = await postLendingInfo({
        content,
        deadline: new Date(deadline),
      })

      if (token == null) return

      if (!shareTargetPickerAvailable) {
        return
      }

      const res = await liff.shareTargetPicker(
        buildLiffLinkMessage(token, content),
      )

      if (res != null && res.status === 'success') {
        await putLendingProcessFinished(token)
        setIsOpenCompleteDialog(true)
        resetForm()
      }
    } catch {
      setIsOpenRetryDialog(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    setIsOpenRetryDialog(false)
    sendLendingInfo()
  }

  const handleCompleteRegister = () => {
    setIsOpenCompleteDialog(false)
    resetForm
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
            STEP2. 貸す友達にメッセージを送るちゅん
          </h2>
          <h3 className="text-gray-600 mt-8 mb-4 mx-8">
            貸す友達にメッセージを送ろう
          </h3>
          <div className="flex flex-col items-stretch mx-auto my-4 justify-stretch px-8 pb-16 max-w-xs">
            <button
              className={c(
                'text-text px-8 py-4 text-sm rounded-sm text-center transition-all',
                inputOk && shareTargetPickerAvailable && !isLoading
                  ? 'bg-accent-400'
                  : 'bg-accent-100',
              )}
              disabled={!inputOk || isLoading}
              onClick={sendLendingInfo}
            >
              友達を選択する（おすすめ）
            </button>
            {shareTargetPickerAvailable === false && (
              <p className="text-red-700 text-xs">
                正常に動作しない可能性があります。
                （お使いのLINEバージョンが10.11.0未満である場合アップデートをお考えください。そうでない場合はリロード等をお試しください。）
              </p>
            )}
            <HrWithMessage
              className={c('mt-6 mb-2', inputOk ? 'opacity-100' : 'opacity-30')}
            >
              <span className="bg-gray-100 px-3">または</span>
            </HrWithMessage>
            <button
              className={c(
                'px-8 py-4 mb-4 text-xs rounded-sm text-center transition-all',
                inputOk ? 'text-gray-500' : 'text-gray-300',
              )}
              disabled={!inputOk}
              // onClick={sendLendingInfo}
            >
              [未実装]手動でメッセージを送る
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
