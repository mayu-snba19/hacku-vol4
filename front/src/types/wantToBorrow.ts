export type WantToBorrowItem = {
  wantToBorrowId: string
  content: string
  friendId: string
  friendName: string
}

export type FriendWantToBorrowList = {
  friendId: string
  friendName: string
  list: WantToBorrowItem[]
}
