import { useSessionStorage } from "@vueuse/core";

/**
 * 记录用户在搜索后给出的搜索结果中，点击的项目
 * 数据格式：
 * ```ts
 * [
 *    {},
 * ]
 * ```
 */
export const useSearchHistoryStore = defineStore('searchHistoryStore', () => {
  type listItem = {
    id: number,
  };
  const list = useSessionStorage('search-history', [] as listItem[]);

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
    _list = _list.filter((item: listItem) => {
      return item.id !== id;
    });
    list.value = _list;
  };

  const add = (item: listItem) => {
    let _list = list.value;
    if (item.id === 0) return;
    if (isNaN(item.id)) return;
    let listIdArr = _list.map(item => item.id);
    if (listIdArr.indexOf(item.id) > -1) {
      _list.splice(listIdArr.indexOf(item.id), 1);
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