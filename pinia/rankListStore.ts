import { RankingListItem } from '~/types/rankingListItem'

export const useRankListStore = defineStore('rankListStore', () => {
  const _isStore = useSessionStorage('rank-list-is-store', false as boolean)
  const _list = useSessionStorage('rank-list-list', [] as RankingListItem[])
  const _currentPage = useSessionStorage('rank-list-current-page', 1 as number)
})