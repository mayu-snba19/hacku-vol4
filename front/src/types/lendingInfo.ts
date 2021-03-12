type LendingBase = {
  lendingId: string
  content: string
  deadline: Date
  // createdAt: Date
}

export type ConcludedLendingInfo = LendingBase & {
  kind: 'lending'
} & {
  status: 'concluded'
  borrowerName: string
}

export type WaitingLendingInfo = LendingBase & {
  kind: 'lending'
} & {
  status: 'waiting'
}

export type LendingInfoStatus = 'concluded' | 'waiting'

/**
 * 貸しているもの
 */
export type LendingInfo = ConcludedLendingInfo | WaitingLendingInfo

/**
 * 借りているもの
 */
export type BorrowingInfo = LendingBase & {
  kind: 'borrowing'
  ownerName: string
}
