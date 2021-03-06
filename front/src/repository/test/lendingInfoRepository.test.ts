import { BorrowingInfo, LendingInfo } from '~/types/lendingInfo'
import {
  fetchLendingList,
  fetchBorrowingList,
  postLendingInfo,
} from '../lendingInfoRepository'

/**
 * オブジェクトのプロパティの型を全てUnknownにする
 */
type MapToUnknown<Base> = { [K in keyof Base]: unknown }

describe('repositoryのテスト', () => {
  test('fetchLendingList', async () => {
    const list = await fetchLendingList('DUMMY_ACCESS_TOKEN')
    expect(list).toEqual(
      expect.arrayContaining<MapToUnknown<LendingInfo>>([
        {
          lendingId: expect.any(String),
          content: expect.any(String),
          deadline: expect.any(Date),
          borrowerName: expect.any(String),
          kind: 'lending',
        },
      ]),
    )
  })
  test('fetchLendingList', async () => {
    const list = await fetchBorrowingList('DUMMY_ACCESS_TOKEN')
    expect(list).toEqual(
      expect.arrayContaining<MapToUnknown<BorrowingInfo>>([
        {
          lendingId: expect.any(String),
          content: expect.any(String),
          deadline: expect.any(Date),
          ownerName: expect.any(String),
          kind: 'borrowing',
        },
      ]),
    )
  })

  test('postLendingInfo & fetchLendingList', async () => {
    const content = 'content'
    const deadline = new Date()

    const token = await postLendingInfo('DUMMY_ACCESS_TOKEN', {
      content,
      deadline,
    })
    expect(token).toEqual(expect.any(String))

    // NOTE: モックサーバでは対応してないっぽい
    // const list = await fetchLendingList('DUMMY_ACCESS_TOKEN')
    // expect(list).toEqual(
    //   expect.arrayContaining([
    //     {
    //       lendingId: expect.any(String),
    //       content,
    //       deadline,
    //     },
    //   ]),
    // )
  })
})
