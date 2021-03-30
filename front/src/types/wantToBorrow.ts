export type WantToBorrowItem = {
  wantToBorrowId: string
  content: string
}

export type FriendWantToBorrowItem = WantToBorrowItem & {
  friendId: string
  friendName: string
}

export type FriendWantToBorrowList = {
  friendId: string
  friendName: string
  list: FriendWantToBorrowItem[]
}
