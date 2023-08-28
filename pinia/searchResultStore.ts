import { AreaListItem } from "~/types/areaListItem"

export const useSearchResultStore = defineStore('searchResultStore', () => {
  const _isStore = useSessionStorage('search-result-is-store', false as boolean)
  const _query = useSessionStorage('search-result-query', '' as string)
  const _list = useSessionStorage('search-result-list', [] as any[])
  const _area = useSessionStorage('search-result-area', [] as AreaListItem[])
  const _currentPage = useSessionStorage('search-result-current-page', 1 as number)
  const _pageSize = useSessionStorage('search-result-page-size', 20 as number)
  const _totalPage = useSessionStorage('search-result-total-page', 1 as number)
  const _totalCount = useSessionStorage('search-result-total-count', 0 as number)
  const _scrollTop = useSessionStorage('search-result-scroll-top', 0 as number)

  const getIsStore = () => {
    return _isStore.value
  }

  const setIsStore = (isStore: boolean) => {
    _isStore.value = isStore
  }

  const getQuery = () => {
    return _query.value
  }

  const setQuery = (query: string) => {
    _query.value = query
  }

  const getList = () => {
    return _list.value
  }

  const setList = (list: any[]) => {
    _list.value = list
  }

  const getArea = () => {
    return _area.value
  }

  const setArea = (area: AreaListItem[]) => {
    _area.value = area
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
    _query.value = ''
    _list.value = []
    _area.value = []
    _currentPage.value = 1
    _pageSize.value = 20
    _totalPage.value = 1
    _totalCount.value = 1
    _scrollTop.value = 0
  }

  return {
    getIsStore,
    setIsStore,
    getQuery,
    setQuery,
    getList,
    setList,
    getArea,
    setArea,
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