import { useLocalStorage } from "@vueuse/core";

/**
 * 记录用户的搜索历史记录
 * 数据格式：
 * ```ts
 * ['建筑木材','广东木材','脚墩木材','杨木木材']
 * ```
 */
export const useSearchInputHistoryStore = defineStore('searchInputHistoryStore', () => {
  const list = useLocalStorage('search-input-history', [] as string[]);

  const getList = () => {
    return list.value;
  };

  const clearAll = () =>{
    list.value = [];
  };

  const remove = (str: string) => {
    let _list = list.value;
    if (str.trim() === '') return;
    _list = _list.filter((item: string) => {
      return item !== str;
    });
    list.value = _list;
  };

  const add = (str: string) => {
    let _list = list.value;
    if (str.trim() === '') return;
    if (_list.indexOf(str) > -1) {
      _list.splice(_list.indexOf(str), 1);
    }
    _list.unshift(str);
    list.value = _list;
  };

  return {
    getList,
    clearAll,
    remove,
    add,
  }
});