import LendingToken from '~/types/lendingToken'
import {
  fetchLendingList as _fetchLendingList,
  fetchBorrowingList as _fetchBorrowingList,
  fetchLendingAndBorrowingList as _fetchLendingAndBorrowingList,
  postLendingInfo as _postLendingInfo,
} from './lendingInfoRepository'

export const postLendingInfo: typeof _postLendingInfo = async () => {
  return Promise.resolve('1' as LendingToken)
}

export const fetchLendingList: typeof _fetchLendingList = async () => {
  return Promise.resolve([])
}

export const fetchBorrowingList: typeof _fetchBorrowingList = async () => {
  return Promise.resolve([])
}

export const fetchLendingAndBorrowingList: typeof _fetchLendingAndBorrowingList = async () => {
  const [lendingList, borrowingList] = await Promise.all([
    fetchLendingList('DUMMY_ACCESS_TOKEN'),
    fetchBorrowingList('DUMMY_ACCESS_TOKEN'),
  ])
  return [...lendingList, ...borrowingList].sort((a, b) =>
    a.createdAt > b.createdAt ? 1 : a.createdAt < b.createdAt ? -1 : 0,
  )
}
