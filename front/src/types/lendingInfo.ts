type LendingBase = {
  lendingId: string
  content: string
  deadline: Date
  createdAt: Date
}

/**
 * 貸しているもの
 */
export type LendingInfo = LendingBase & {
  borrowerName: string
  kind: 'lending'
}

/**
 * 借りているもの
 */
export type BorrowingInfo = LendingBase & {
  ownerName: string
  kind: 'borrowing'
}
