import React from 'react'
import c from 'classnames'

type Props = {
  isOpen: boolean
  positiveLabel: string
  negativeLabel?: string
  onClickConfirm: () => void
  onClose: () => void
  shouldCloseOnOverlayClick?: boolean
}

// TODO: モーダルを閉じる時のちらつき

const Modal: React.FC<Props> = ({
  isOpen,
  children,
  positiveLabel,
  negativeLabel,
  onClose,
  onClickConfirm,
  shouldCloseOnOverlayClick = true,
}) => {
  const handleClickOverlay = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault()
    if (shouldCloseOnOverlayClick) {
      onClose()
    }
  }

  return (
    <>
      <div
        className={c(
          'fixed top-0 left-0 w-full h-full bg-gray-700 z-40 transition-all',
          isOpen
            ? 'opacity-70 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
        onClick={handleClickOverlay}
      />
      <div
        className={c(
          'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 transition-all',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      >
        <section className="bg-gray-50 rounded-md shadow-lg px-4 pt-8 pb-4 w-full font-pop tracking-wide">
          {children}
          <div
            className={c(
              'mt-8 flex flex-row',
              negativeLabel == null ? 'justify-center' : 'justify-end',
            )}
          >
            {negativeLabel != null && (
              <button
                className="px-4 py-2 bg-gray-300 text-white mx-2 rounded-sm"
                onClick={onClose}
              >
                {negativeLabel}
              </button>
            )}
            <button
              className="px-4 py-2 bg-brand-400 text-text mx-2 rounded-sm"
              onClick={onClickConfirm}
            >
              {positiveLabel}
            </button>
          </div>
        </section>
      </div>
    </>
  )
}

export default Modal
