import { RankingListItem } from '~/types/rankingListItem'

export const useRankListStore = defineStore('rankListStore', () => {
  const _isStore = useSessionStorage('rank-list-is-store', false as boolean)
  const _list = useSessionStorage('rank-list-list', [] as RankingListItem[])
  const _currentPage = useSessionStorage('rank-list-current-page', 1 as number)
  const _pageSize = useSessionStorage('rank-list-page-size', 20 as number)
  const _totalPage = useSessionStorage('rank-list-total-page', 1 as number)
  const _totalCount = useSessionStorage('rank-list-total-count', 0 as number)
  const _scrollTop = useSessionStorage('rank-list-scroll-top', 0 as number)

  const getIsStore = () => {
    return _isStore.value
  }

  const setIsStore = (isStore: boolean) => {
    _isStore.value = isStore
  }

  const getList = () => {
    return _list.value
  }

  const setList = (list: any[]) => {
    _list.value = list
  }

  const getCurrentPage = () => {
    return _currentPage.value
  }

  const setCurrentPage = (currentPage: number) => {
    _currentPage.value = currentPage
  }

  const getPageSize = () => {
    return _pageSize.value
  }

  const setPageSize = (pageSize: number) => {
    _pageSize.value = pageSize
  }

  const getTotalPage = () => {
    return _totalPage.value
  }

  const setTotalPage = (totalPage: number) => {
    _totalPage.value = totalPage
  }

  const getTotalCount = () => {
    return _totalCount.value
  }

  const setTotalCount = (totalCount: number) => {
    _totalCount.value = totalCount
  }

  const getScrollTop = () => {
    return _scrollTop.value
  }

  const setScrollTop = (scrollTop: number) => {
    _scrollTop.value = scrollTop
  }

  const clearAll = () => {
    _isStore.value = false
    _list.value = []
    _currentPage.value = 1
    _pageSize.value = 20
    _totalPage.value = 1
    _totalCount.value = 1
    _scrollTop.value = 0
  }

  return {
    getIsStore,
    setIsStore,
    getList,
    setList,
    getCurrentPage,
    setCurrentPage,
    getPageSize,
    setPageSize,
    getTotalPage,
    setTotalPage,
    getTotalCount,
    setTotalCount,
    getScrollTop,
    setScrollTop,
    clearAll,
  }
})