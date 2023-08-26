import { useLocalStorage } from "@vueuse/core";

import { SearchHistoryListItem } from '~/types/searchHistoryListItem';

let wordLogoBgColors = [
  '#8BABE5',
  '#E5A687',
  '#97BB72',
  '#D294D2',
  '#E5BF72',
]

function shuffle(arr: any[]): (typeof arr) {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    let index = parseInt((Math.random() * (len - i)).toString())
    let temp = arr[index]
    arr[index] = arr[len - i - 1]
    arr[len - i - 1] = temp
  }
  return arr
}

/**
 * 记录用户在搜索后给出的搜索结果中，点击的项目
 */
export const useSearchHistoryStore = defineStore('searchHistoryStore', () => {
  const list = useLocalStorage('search-history', [] as SearchHistoryListItem[]);

  const getList = () => {
    let _list = list.value
    _list = _list.map((item, index) => {
      if (index % wordLogoBgColors.length === 0) {
        wordLogoBgColors = shuffle(wordLogoBgColors)
      }
      item.word_logo_bg_color = wordLogoBgColors[index]
      return item
    })
    return _list;
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
    _list = _list.filter(item1 => Number(item1.id) != Number(item.id))
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