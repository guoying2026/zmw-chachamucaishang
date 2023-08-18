import { useLocalStorage } from "@vueuse/core";

import { SearchHistoryListItem } from '~/types/searchHistoryListItem';

/**
 * 记录用户在搜索后给出的搜索结果中，点击的项目
 */
export const useSearchHistoryStore = defineStore('searchHistoryStore', () => {
  const list = useLocalStorage('search-history', [] as SearchHistoryListItem[]);

  const getList = () => {
    return list.value;
  };

  const clearAll = () => {
    list.value = [];
  };

  const remove = (id: number) => {
    let _list = list.value;
    if (id === 0) return;
    if (isNaN(id)) return;
    _list = _list.filter((item: SearchHistoryListItem) => {
      return item.id !== id;
    });
    list.value = _list;
  };

  const add = (item: SearchHistoryListItem) => {
    let maxCount = 5
    let _list = list.value;
    if (item.id === 0) return;
    if (isNaN(item.id)) return;
    let listIdArr = _list.map(item => item.id);
    if (listIdArr.indexOf(item.id) > -1) {
      _list.splice(listIdArr.indexOf(item.id), 1);
    }
    if (_list.length >= maxCount) {
      _list = _list.splice(0, maxCount - 1)
    }
    _list.unshift(item);
    list.value = _list;
  };

  return {
    getList,
    clearAll,
    remove,
    add,
  }
});