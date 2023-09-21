<script setup lang="ts">
import { AreaListItem } from '~/types/areaListItem'

import { SearchResultListItem } from '~/types/searchResultListItem'

// 导入搜索历史记录存储
import { useSearchHistoryStore } from '~/pinia/searchHistory'

// 导入用户的权限授权操作记录
import { useUserPermissionStore } from '~/pinia/userPermission'

// 导入搜索结果临时存储记录
import { useSearchResultStore } from '~/pinia/searchResultStore'

const route = useRoute()

const nuxtApp = useNuxtApp()

useHead({
  title: '搜索结果',
})

const isMobile = ref<boolean>(false)

// 实例化搜索历史记录存储
const searchHistoryStore = useSearchHistoryStore()

// 实例化用户的权限授权操作记录
const userPermissionStore = useUserPermissionStore()

// 实例化搜索结果临时记录存储
const searchResultStore = useSearchResultStore()

const areaList = ref<AreaListItem[]>([{
  code: 0,
  name: '全国',
  childs: [{
    code: 0,
    name: '全国',
    childs: [],
    is_selected: false,
    is_show: true,
  }],
  is_selected: false,
  is_show: true,
}]);

const {
  data: areaListData
} = useNuxtData('areaDataList').data.value ? useNuxtData('areaDataList') : useLazyAsyncData('areaDataList', () => $fetch('/api/areaData'))

const isShowAreaSelect = ref<boolean>(false)

const areaFirstSelectedIndex = ref<number>(0)

const areaSecondSelectedIndex = ref<number>(0)

const isLeaveMeClosestDistance = ref<boolean>(false)

const totalCountOfSearchResult = ref<number>(0)

const searchResultList = ref<SearchResultListItem[]>([])

const isShowPhonePopup = ref<boolean>(false)

const showPhoneIndex = ref<number>(-1)

const isShowMoreProvinceSelect = ref<boolean>(false)

const isCanMultiSelectProvince = ref<boolean>(false)

const isShowMultiSelectProvincePopup = ref<boolean>(false)

const areaSearchText = ref<string>('')

const headerWidth = ref<string>('100vw');

const currentPage = ref<number>(1);

const pageSize = ref<number>(20);

const paginationSize = ref<number>(5);

const totalPages = ref<number>(1);

const inputPage = ref<number>(currentPage.value);

const isShowAskForGetPositionPopup = ref<boolean>(false)

const searchInputText = ref<string>(route.query.search ? route.query.search as string : '')

const intersectionObserver = ref<IntersectionObserver | null>(null)

watch(() => intersectionObserver.value, (newProps) => {
  const el = document.querySelector('.load-more-tips')
  if (newProps && el) {
    newProps.unobserve(el)
    newProps.observe(el)
  }
})

const isReloadSearchResultList = ref<boolean>(true)

const isHasMoreSearchResultList = ref<boolean>(true)

const paginationArr = ref<(number|string)[]>([1])

const {
  pending: isSearchResultListPending,
  data: searchResultListData,
  error: searchResultListError,
  refresh: searchResultListRefresh,
} = useLazyAsyncData('searchResultList', () => $fetch('/api/getSearchList', {
  query: {
    name: searchInputText.value,
    area: getSelectedAreaListArr(areaList.value).join('+'),
    page: isReloadSearchResultList.value ? 1 : currentPage.value,
    page_size: pageSize.value,
  }
}))

watch(() => areaList.value, (newProps) => {
  searchResultListRefresh()
})

function getSelectedAreaListArr(newProps: AreaListItem[]): string[] {
  let ret = [] as string[]
  let selectedProvinceList = newProps.filter(item => item.is_selected && item.code != 0)
  selectedProvinceList.forEach(item => {
    let selectedCityList = item.childs.filter(subitem => subitem.is_selected && subitem.code != 0)
    if (selectedCityList.length == 0 || selectedCityList.length == item.childs.length - 1) {
      ret.push(item.name)
      return false
    }
    selectedCityList.forEach(subitem => {
      ret.push(subitem.name)
    })
  })
  return ret
}

const arrowY1 = ref<number>(3)
const arrowY2 = ref<number>(22)

function changeArrowY() {
  let isTopToBottom = isShowMultiSelectProvincePopup.value
  let times = 0;
  let timer = setInterval(() => {
    if (isTopToBottom) {
      arrowY1.value -= 18 / 15
      arrowY2.value += 20  / 15
    } else {
      arrowY1.value += 18 / 15
      arrowY2.value -= 20 / 15
    }
    if (times >= 15) {
      clearInterval(timer)
      if (isTopToBottom) {
        arrowY1.value = 3
        arrowY2.value = 22
      } else {
        arrowY1.value = 21
        arrowY2.value = 2
      }
    }
    times++;
  }, 10)
}

const arrowY3 = ref<number>(3)
const arrowY4 = ref<number>(22)

function changeArrowY1() {
  let isTopToBottom = isShowAreaSelect.value
  let times = 0;
  let timer = setInterval(() => {
    if (isTopToBottom) {
      arrowY3.value -= 18 / 15
      arrowY4.value += 20  / 15
    } else {
      arrowY3.value += 18 / 15
      arrowY4.value -= 20 / 15
    }
    if (times >= 15) {
      clearInterval(timer)
      if (isTopToBottom) {
        arrowY3.value = 3
        arrowY4.value = 22
      } else {
        arrowY3.value = 21
        arrowY4.value = 2
      }
    }
    times++;
  }, 10)
}

function areaListDataChangedHandle(newProps: any) {
  if (searchResultStore.getIsStore()) {
    // 这里不能清除掉searchResultStore，如果是从缓存读取，则不要再去请求接口了
    return false
  }
  let res = JSON.parse(JSON.stringify(newProps)) as {
    code: number,
    message: string,
    result?: AreaListItem[],
  }
  if (!res || res.code != 200 || !res.result) return;
  let areaData: AreaListItem[] = res.result ? res.result : []
  // 添加“全(省/市/自治区)”
  areaData = areaData.map((item: AreaListItem) => {
    let end = '';
    if (item.name.includes('自治区')) {
      end = '全自治区';
    } else if (item.name.includes('市')) {
      end = '全市';
    } else {
      end = '全省';
    }
    item.childs.unshift({
      code: item.code,
      name: item.name + end,
      childs: [],
      is_selected: false,
      is_show: true,
    });
    item.is_show = true;
    item.childs = item.childs.map(subitem => {
      subitem.is_show = true;
      return subitem;
    });
    return item;
  });
  // 添加“全国”
  areaData.unshift({
    code: 0,
    name: '全国',
    childs: [{
      code: 0,
      name: '全国',
      childs: [],
      is_selected: false,
      is_show: true,
    }],
    is_selected: false,
    is_show: true,
  });
  areaList.value = areaData;
}

function searchResultListChangedHandle (newProps: any) {
  if (searchResultStore.getIsStore()) {
    // 这里不能清除掉searchResultStore，如果是从缓存读取，则不要再去请求接口了
    return false
  }
  isReloadSearchResultList.value = true
  let res1 = newProps as {code: number, message: string, result?: {current_page: number, data: any[], page_size: number, total_page: number, total_size: number}}
  if (!res1 || res1.code != 200 || !res1.result) return;
  if (res1.result && res1.result.data) {
    // 如果为首页(第一页)，则清除旧数据
    if (res1.result.current_page == 1) {
      searchResultList.value = []
    }
    if (isMobile.value && res1.result.current_page == 1) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    // 修改搜索结果列表数据
    if (isMobile.value) {
      searchResultList.value = searchResultList.value.concat(res1.result.data)
    } else {
      searchResultList.value = res1.result.data
    }
    totalCountOfSearchResult.value = res1.result.total_size
    currentPage.value = res1.result.current_page
    pageSize.value = res1.result.page_size
    totalPages.value = res1.result.total_page
    // 如果是最后一页，则不能再加载更多
    if (res1.result.current_page == res1.result.total_page) {
      isHasMoreSearchResultList.value = false
    }
    paginationArr.value = generatePaginationArr({
      totalPages: res1.result.total_page,
      pageSize: res1.result.page_size,
      currentPage: res1.result.current_page,
      paginationSize: paginationSize.value,
    })
  }
}

// 监听url参数search的变化
watch(() => route.query.search, (newProps) => {
  if (typeof newProps == 'string' && newProps.trim().length > 0) {
    searchInputText.value = newProps.trim()
    currentPage.value = 1
    isReloadSearchResultList.value = false
    searchResultListRefresh()
    watch(() => newProps as string, (newProps) => {
      searchInputText.value = newProps.trim()
      currentPage.value = 1
      isReloadSearchResultList.value = false
      searchResultListRefresh()
      useHead({
        title: newProps + ' - 搜索结果',
      })
    })
    useHead({
      title: newProps + ' - 搜索结果',
    })
  }
})

watch(() => searchResultListData.value, searchResultListChangedHandle)

/**
 * 上一页
 */
function jumpToPrevPage() {
  if (currentPage.value - 1 > 0) {
    jumpToPage(currentPage.value - 1);
  } else {
    jumpToPage(1);
  }
}

/**
 * 下一页
 */
function jumpToNextPage() {
  if (currentPage.value + 1 <= totalPages.value) {
    jumpToPage(currentPage.value + 1);
  } else {
    jumpToPage(totalPages.value);
  }
}

/**
 * 跳转到指定的页码
 * @param page
 */
function jumpToPage(page: number) {
  if (page < 1) page = 1
  if (page > totalPages.value) page = totalPages.value
  currentPage.value = page;
  isReloadSearchResultList.value = false
  searchResultStore.clearAll()
  searchResultListRefresh()
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  document.querySelector('.search-tips-area.expanded')?.classList.remove('expanded')
}

/**
 * 跳转到输入的页码
 */
function jumpToInputPage() {
  jumpToPage(Number(inputPage.value));
}

/**
 * 地区名称搜索的处理事件
 */
function filterAreaSearchHandle() {
  searchResultStore.clearAll()
  // 如果没有输入任何关键词或关键词为空格，则所有的区域都显示
  if (areaSearchText.value.trim() == '') {
    areaList.value = areaList.value.map(item => {
      item.is_show = true;
      item.childs = item.childs.map(subitem => {
        subitem.is_show = true;
        return subitem;
      });
      return item;
    });
    return;
  }
  let fi = -1;
  let si = -1;
  areaList.value = areaList.value.map((item, index) => {
    // 如果输入的关键词匹配到省份或直辖市，则对应的地级市级别全部显示，然后跳过该省份或直辖市
    if (item.name.includes(areaSearchText.value)) {
      item.is_show = true;
      if (fi == -1) fi = index;
      item.childs = item.childs.map((subitem, subindex) => {
        subitem.is_show = true;
        if (si == -1) si = subindex;
        return subitem;
      });
      return item;
    }
    // 如果输入的关键词匹配到地级市，则显示该地级市
    item.childs = item.childs.map((subitem, subindex) => {
      subitem.is_show = subitem.name.includes(areaSearchText.value);
      if (subitem.is_show && si == -1) si = subindex;
      return subitem;
    });
    item.is_show = item.childs.filter(subitem=>subitem.is_show).length > 0;
    if (item.is_show && fi == -1) fi = index;
    return item;
  });
  if (fi > -1) areaFirstSelectedIndex.value = fi;
  if (fi > -1 && si > -1) areaSecondSelectedIndex.value = si;
}

/**
 * 显示区域筛选弹出框
 */
function showAreaSelect() {
  searchResultStore.clearAll()
  changeArrowY1()
  isShowAreaSelect.value = true;
}

/**
 * 隐藏区域筛选弹出框
 */
function hideAreaSelect() {
  searchResultStore.clearAll()
  changeArrowY1()
  isShowAreaSelect.value = false;
}

/**
 * 改变区域选择的省份的高亮选项
 * @param index
 */
function changeAreaFirstSelectedIndex(index: number) {
  searchResultStore.clearAll()
  areaFirstSelectedIndex.value = index;
  areaSecondSelectedIndex.value = 0;
  // 关闭“离我最近”功能
  isLeaveMeClosestDistance.value = false;
}

/**
 * 改变区域选择的地级市的高亮选项
 * @param index
 */
function changeAreaSecondSelectedIndex(index: number) {
  searchResultStore.clearAll()
  areaSecondSelectedIndex.value = index;
  // 关闭“离我最近”功能
  isLeaveMeClosestDistance.value = false;
  // 模拟点击该地级市选项
  changeAreaListCityIsSelectedWithOnlyOne(index);
  hideAreaSelect();
}

/**
 * 区域筛选弹出框的勾选或取消勾选省份
 * @param index
 */
function changeAreaFirstIsSelected(index: number) {
  searchResultStore.clearAll()
  // 关闭“离我最近”功能
  isLeaveMeClosestDistance.value = false
  // 获取在点击之前的选中状态
  let isSelected = areaList.value[index].is_selected;
  // 高亮该省份或直辖市
  if (areaFirstSelectedIndex.value != index) {
    areaFirstSelectedIndex.value = index;
    areaSecondSelectedIndex.value = 1;
  }
  // 反选该省份或直辖市，同步选中或取消选中对应的地级市
  areaList.value = areaList.value.map((_item, _index) => {
    if (_index != index) return _item;
    _item.is_selected = !isSelected;
    _item.childs = _item.childs.map((_subitem, _subindex) => {
      _subitem.is_selected = false;
      if (_subindex > 0) {
        _subitem.is_selected = !isSelected;
      }
      return _subitem;
    });
    return _item;
  });
}

/**
 * 区域筛选弹出框的勾选或取消勾选地级市
 * @param index
 */
function changeAreaSecondIsSelected(index: number) {
  searchResultStore.clearAll()
  // 关闭“离我最近”功能
  isLeaveMeClosestDistance.value = false
  areaList.value = areaList.value.map((_item, _index) => {
    // 如果该省份为该地级市的归属省份，再获取该地级市，并反选该地级市
    if (_index == areaFirstSelectedIndex.value) {
      _item.childs = _item.childs.map((_subitem, _subindex) => {
        if (_subindex != index) return _subitem;
        _subitem.is_selected = !_subitem.is_selected;
        return _subitem;
      });
    }
    // 如果归属省份的地级市的选中数量大于零，则选中该省份
    if (_item.childs.filter(_item => _item.is_selected).length > 0) {
      _item.is_selected = true;
    } else {
      _item.is_selected = false;
    }
    return _item;
  });
}

/**
 * 多选地区或取消多选地区的处理事件
 */
function changeIsCanMultiSelectProvince() {
  searchResultStore.clearAll()
  // 关闭“离我最近”功能
  isLeaveMeClosestDistance.value = false
  // 修改多选或取消多选的状态
  isCanMultiSelectProvince.value = !isCanMultiSelectProvince.value;
  // 如果是单选状态，判断第一个选中的地级市，该地级市以及对应的归属省份为选中状态，其它省份和地级市为未选状态
  if (!isCanMultiSelectProvince.value) {
    // 是否有第一个选中的省份了
    let isHasFirstSelected = false;
    areaList.value = areaList.value.map(item => {
      // 如果有第一个选中的省份了，则其它都未选，然后跳过后面的处理
      if (isHasFirstSelected) {
        item.is_selected = false;
        item.childs = item.childs.map(subitem => {
          subitem.is_selected = false;
          return subitem;
        });
        return item;
      }
      // 如果该省份已选，则判断对应的地级市
      if (item.is_selected) {
        isHasFirstSelected = true;
        // 是否有第一个选中的地级市了
        let isHasFirstSelected1 = false;
        item.childs = item.childs.map((subitem, subindex) => {
          if (subindex == 0) return subitem;
          if (subitem.is_selected && !isHasFirstSelected1) {
            isHasFirstSelected1 = true;
          } else {
            subitem.is_selected = false;
          }
          return subitem;
        });
      }
      return item;
    });
  } else {
    areaList.value = areaList.value.map(item => {
      if (!item.is_selected) return item;
      let isHasFirstSelectedCity = item.childs.filter((subitem, subindex) => {
        if (subindex == 0) return false;
        return subitem.is_selected;
      }).length > 0;
      if (isHasFirstSelectedCity) return item;
      item.childs = item.childs.map((subitem, subindex) => {
        if (subindex == 0) return subitem;
        subitem.is_selected = true;
        return subitem;
      });
      return item;
    })
  }
}

/**
 * 显示移动端的电话号码展示弹窗
 */
function showPhonePopup() {
  searchResultStore.clearAll()
  isShowPhonePopup.value = true
}

/**
 * 隐藏移动端的电话号码展示弹窗
 */
function hidePhonePopup() {
  searchResultStore.clearAll()
  isShowPhonePopup.value = false
}

/**
 * 移动端的显示更多手机号码的处理事件
 * @param index
 */
function showAllPhone(index: number) {
  searchResultStore.clearAll()
  showPhoneIndex.value = index;
  showPhonePopup();
}

/**
 * pc端的显示更多手机号码的处理事件
 * @param index
 */
function showPhonePopupByPc(index: number) {
  searchResultStore.clearAll()
  searchResultList.value = searchResultList.value.map((_item, _index) => {
    if (_index == index) {
      _item.is_show_phone_popup = true;
    } else {
      // 其它搜索结果的更多手机号码弹出框隐藏掉
      _item.is_show_phone_popup = false;
    }
    return _item;
  });
}

/**
 * pc端的隐藏更多手机号码的处理事件
 * @param index
 */
function hidePhonePopupByPc() {
  searchResultStore.clearAll()
  searchResultList.value = searchResultList.value.map((item, index) => {
    item.is_show_phone_popup = false;
    return item;
  })
}

/**
 * pc端的显示更多手机号码的处理事件
 * @param index
 */
function showAllPhoneByPc(index: number) {
  searchResultStore.clearAll()
  showPhonePopupByPc(index);
}

/**
 * 显示多选地区弹出框
 */
function showMultiSelectProvincePopup() {
  searchResultStore.clearAll()
  changeArrowY()
  isShowMultiSelectProvincePopup.value = true;
  if (areaFirstSelectedIndex.value == 0 && areaSecondSelectedIndex.value == 0) {
    areaFirstSelectedIndex.value = 1;
    areaSecondSelectedIndex.value = 1;
  }
}

/**
 * 隐藏多选地区弹出框
 */
function hideMultiSelectProvincePopup() {
  searchResultStore.clearAll()
  changeArrowY()
  isShowMultiSelectProvincePopup.value = false;
}

/**
 * 清除所有的省份和地级市的选中状态
 */
function clearAllMultiSelectProvinceIsSelected() {
  searchResultStore.clearAll()
  isLeaveMeClosestDistance.value = false
  areaList.value = areaList.value.map(item => {
    item.is_selected = false;
    item.childs = item.childs.map(subitem => {
      subitem.is_selected = false;
      return subitem;
    });
    return item;
  });
}

/**
 * 清除所有的地级市的选中状态
 */
function clearAllMultiSelectCityIsSelected() {
  searchResultStore.clearAll()
  isLeaveMeClosestDistance.value = false
  areaList.value = areaList.value.map(item => {
    item.childs = item.childs.map(subitem => {
      subitem.is_selected = false;
      return subitem;
    });
    return item;
  });
}

/**
 * pc端单选地区的点击省份的处理事件
 * @param index
 */
function changeAreaListProvinceIsSelectedWithOnlyOne(index: number) {
  searchResultStore.clearAll()
  // 关闭“离我最近”功能
  isLeaveMeClosestDistance.value = false
  // 获取该省份再点击前的选中状态
  let isSelected = areaList.value[index].is_selected;
  areaFirstSelectedIndex.value = index;
  areaList.value = areaList.value.map((_item, _index) => {
    // 如果是点击的省份，则反选，对应的地级市列表也反选
    if (_index == index) {
      _item.is_selected = !isSelected;
      if (!_item.is_selected) {
        _item.childs = _item.childs.map((_subitem, _subindex) => {
          _subitem.is_selected = !isSelected;
          if (_subindex == 0) {
            _subitem.is_selected = false;
          }
          return _subitem;
        });
      }
    } else {
      // 如果不是点击的省份，则取消选中该省份和对应的地级市列表
      _item.is_selected = false;
      _item.childs = _item.childs.map((_subitem, _subindex) => {
        _subitem.is_selected = false;
        if (_subindex == 0) {
          _subitem.is_selected = false;
        }
        return _subitem;
      });
    }
    return _item;
  });
}

/**
 * pc端单选地区的点击地级市的处理事件
 * @param index
 */
function changeAreaListCityIsSelectedWithOnlyOne(index: number) {
  searchResultStore.clearAll()
  // 关闭“离我最近”功能
  isLeaveMeClosestDistance.value = false
  // 获取该地级市在点击之前的选中状态
  let isSelected = areaList.value[areaFirstSelectedIndex.value].childs[index].is_selected;
  areaList.value = areaList.value.map((_item, _index) => {
    // 如果是点击的地级市的归属省份，则反选该省份和该地级市
    if (_index == areaFirstSelectedIndex.value) {
      _item.is_selected = !isSelected;
      _item.childs = _item.childs.map((_subitem, _subindex) => {
        if (_subindex == index) {
          _subitem.is_selected = !isSelected;
        } else {
          _subitem.is_selected = false;
        }
        return _subitem;
      });
    } else {
      // 否则直接取消选中省份和地级市
      _item.is_selected = false;
      _item.childs = _item.childs.map((_subitem, _subindex) => {
        _subitem.is_selected = false;
        return _subitem;
      });
    }
    return _item;
  });
}

/**
 * pc端的取消“离我最近”，即pc端的“商家距离-全部”的处理事件
 */
function changeToSwitchArea() {
  searchResultStore.clearAll()
  isLeaveMeClosestDistance.value = false;
}

/**
 * pc端的“商家距离-离我最近”的处理事件
 */
function changeToLeaveMeClosestDistance() {
  searchResultStore.clearAll()
  if (!userPermissionStore.checkIsAllowed('getUserLocation')) {
    showAskForGetPositionPopup();
    return false;
  }
  getAreaInfoByIP();
}

/**
 * 允许获取定位
 */
function allowGetPositionClickHandle() {
  searchResultStore.clearAll()
  userPermissionStore.allow('getUserLocation')
  getAreaInfoByIP()
}

/**
 * 拒绝获取定位
 */
function denyGetPositionClickHandle() {
  searchResultStore.clearAll()
  userPermissionStore.deny('getUserLocation')
  hideAskForGetPositionPopup()
}

/**
 * 通过ip获取当前地理位置的处理事件，即“获取定位权限询问弹窗”的“允许”的处理事件
 */
async function getAreaInfoByIP() {
  searchResultStore.clearAll()
  // 调用获取位置信息接口
  const url = process.env.NODE_ENV == 'production' ? '/api/getAreaInfoByIp' : '/api/getAreaInfoByIp?ip=223.104.65.74'
  const { data } = await useFetch(url)
  hideAskForGetPositionPopup()
  let res = data.value as {
    code: number,
    message: string,
    result: any,
  }
  // 如果接口有错误或出问题，则取消“离我最近”功能
  if (!res.hasOwnProperty('code') || Number(res.code) != 200) {
    changeToSwitchArea()
  }
  // 取消所有的省份和地级市的选中状态
  clearAllMultiSelectProvinceIsSelected()
  // 开启“离我最近”功能
  isLeaveMeClosestDistance.value = true
  // 取消多选功能
  isCanMultiSelectProvince.value = false
  // 如果返回了省份区划代码，并且匹配到了，则该省份为选中状态
  if (res.result.hasOwnProperty('province_code') && Number(res.result.province_code) > 0) {
    areaList.value = areaList.value.map((item, index) => {
      item.is_selected = item.code == Number(res.result.province_code)
      if (item.is_selected) areaFirstSelectedIndex.value = index
      return item
    })
  }
  // 如果返回了地级市区划代码，并且匹配到了，则该地级市为选中状态
  if (res.result.hasOwnProperty('city_code') && Number(res.result.city_code) > 0) {
    areaList.value = areaList.value.map(item => {
      item.childs = item.childs.map((subitem, subindex) => {
        subitem.is_selected = subitem.code == Number(res.result.city_code)
        if (subitem.is_selected) areaSecondSelectedIndex.value = subindex
        return subitem
      })
      return item
    })
  }
}

/**
 * 显示获取定位权限询问弹窗
 */
function showAskForGetPositionPopup() {
  searchResultStore.clearAll()
  isShowAskForGetPositionPopup.value = true;
}

/**
 * 隐藏获取定位权限询问弹窗
 */
function hideAskForGetPositionPopup() {
  searchResultStore.clearAll()
  isShowAskForGetPositionPopup.value = false;
}

function recordClickItem(item: SearchResultListItem) {
  searchHistoryStore.add({
    id: Number(item.id),
    name: item.company_name,
    logo: item.company_img,
    short_name: item.short_name,
    word_logo_bg_color: '',
  })
}

function generatePaginationArr(data: {
  totalPages: number;
  pageSize: number;
  currentPage: number;
  paginationSize: number;
}) {
  let ret: (string|number)[] = []
  if (data.totalPages <= data.paginationSize) {
    let i = 0
    while (i++ < data.paginationSize) {
      ret.push(i)
    }
  } else if (data.currentPage <= data.paginationSize - 2 && data.totalPages >= data.paginationSize + 2) {
    let i = 0
    while (i++ < data.paginationSize - 1) {
      ret.push(i)
    }
    ret.push('...')
    ret.push(data.totalPages)
  } else if (data.currentPage <= data.paginationSize - 2 && data.totalPages < data.paginationSize + 2) {
    let i = 0
    while (i++ < data.paginationSize - 1) {
      ret.push(i)
    }
    ret.push('...')
    ret.push(data.totalPages)
  } else if (data.currentPage >= data.totalPages - data.paginationSize + 3) {
    ret.push(1)
    ret.push('...')
    let i = data.totalPages - data.paginationSize + 1
    while (i++ < data.totalPages) {
      ret.push(i)
    }
  } else {
    ret.push(1)
    ret.push('...')
    let i = data.currentPage - 2
    while (i++ < data.currentPage + 1) {
      ret.push(i)
    }
    ret.push('...')
    ret.push(data.totalPages)
  }
  return ret
}

areaListDataChangedHandle(areaListData.value)

watch(() => areaListData.value, areaListDataChangedHandle)

if (searchResultStore.getIsStore() && (!searchResultStore.getArea() || searchResultStore.getArea().length == 0 || !searchResultStore.getList())) {
  searchResultStore.clearAll()
}

if (searchResultStore.getIsStore()) {
  // 如果进来搜索结果页面后，能够找到searchResult缓存数据，则优先使用缓存数据
  searchInputText.value = searchResultStore.getQuery()
  currentPage.value = searchResultStore.getCurrentPage()
  totalCountOfSearchResult.value = searchResultStore.getTotalCount()
  pageSize.value = searchResultStore.getPageSize()
  totalPages.value = searchResultStore.getTotalPage()
  searchResultList.value = searchResultStore.getList()
  areaList.value = searchResultStore.getArea()
  isCanMultiSelectProvince.value = searchResultStore.getIsCanMultiSelectProvince()
  isLeaveMeClosestDistance.value = searchResultStore.getIsLeaveMeClosestDistance()
  paginationArr.value = generatePaginationArr({
    totalPages: searchResultStore.getTotalPage(),
    pageSize: searchResultStore.getPageSize(),
    currentPage: searchResultStore.getCurrentPage(),
    paginationSize: paginationSize.value,
  })
  nextTick(() => {
    useHead({
      title: searchResultStore.getQuery() + ' - 搜索结果',
    })
    window.scrollTo({
      top: searchResultStore.getScrollTop(),
    })
  })
} else {
  // 如果没有缓存数据，则按照默认的逻辑处理
  currentPage.value = 1
  isReloadSearchResultList.value = false
  if (route.query.search && typeof route.query.search == 'string' && route.query.search.trim().length > 0) {
    searchInputText.value = route.query.search
  }
  let res: {code?: number, message?: string, result?: {data?: []}} = searchResultListRefresh() as {}
  searchResultListChangedHandle(res)
  useHead({
    title: route.query.search + ' - 搜索结果',
  })
}

onBeforeRouteLeave((to: any, from: any, next: Function) => {
  searchResultStore.clearAll()
  if (['detail'].includes(to.name)) {
    // 如果访问的是detail页面，则缓存searchResult的数据
    searchResultStore.setIsStore(true)
    searchResultStore.setQuery(route.query.search as string)
    searchResultStore.setList(searchResultList.value)
    searchResultStore.setArea(areaList.value)
    searchResultStore.setCurrentPage(currentPage.value)
    searchResultStore.setPageSize(pageSize.value)
    searchResultStore.setTotalPage(totalPages.value)
    searchResultStore.setTotalCount(totalCountOfSearchResult.value)
    searchResultStore.setScrollTop(window.scrollY)
    searchResultStore.setIsCanMultiSelectProvince(isCanMultiSelectProvince.value)
    searchResultStore.setIsLeaveMeClosestDistance(isLeaveMeClosestDistance.value)
  }
  next()
})

nuxtApp.hook('page:finish', () => {
  isMobile.value = window.screen.width < 768
  const intersectionObserverCallback = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].intersectionRatio <= 0) return;
    if (currentPage.value > totalPages.value) return;
    searchResultStore.clearAll()
    currentPage.value = currentPage.value + 1
    isReloadSearchResultList.value = false
    searchResultListRefresh()
  }
  if (window.screen.width < 768 && !intersectionObserver.value) intersectionObserver.value = new IntersectionObserver(intersectionObserverCallback)
  window.addEventListener('resize', () => {
    isMobile.value = window.screen.width < 768
    if (!intersectionObserver.value) return;
    intersectionObserver.value.disconnect()
    if (window.screen.width < 768) {
      intersectionObserver.value = new IntersectionObserver(intersectionObserverCallback)
    }
  })
})
</script>

<template>
  <ClientOnly>
  <!-- 移动端筛选 -->
  <div class="fixed md:hidden w-full z-10 select-none">
    <!-- 顶部的筛选和排序 -->
    <div class="relative w-full inline-flex flex-row justify-evenly bg-black py-2 z-10">
      <!-- 省份地区 -->
      <div @click="isShowAreaSelect?hideAreaSelect():showAreaSelect()" class="inline-flex flex-row justify-center items-center text-sm font-normal cursor-pointer">
        <span :class="'transition-all' + (isLeaveMeClosestDistance?'':' font-orange')">{{ areaList[areaFirstSelectedIndex].childs[areaSecondSelectedIndex].name }}</span>
        <svg :class="'w-2 h-2 ml-1 transition-all'+(isLeaveMeClosestDistance?'':' font-orange')" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path class="transition-all" fill="currentColor" :d="'M1 '+arrowY3+'h22L12 '+arrowY4"/></svg>
      </div>
      <!-- 商家距离 -->
      <div @click="changeToLeaveMeClosestDistance" :class="'inline-flex flex-row justify-center items-center text-sm font-normal cursor-pointer transition-all' + (isLeaveMeClosestDistance ? ' font-orange' : '')">离我最近</div>
    </div>
    <!-- 区域筛选弹出框 -->
    <div @click="hideAreaSelect" :class="'absolute top-0 left-0 inline-block w-screen ' + (isShowAreaSelect ? 'h-screen' : 'h-0') + ' z-0 transition-all area-select-box-cover'"></div>
    <div :class="'relative w-full md:w-1/2 ' + (isShowAreaSelect ? 'max-h-screen' : 'max-h-0') + ' inline-flex flex-row justify-start items-start text-sm font-normal pr-0.5 overflow-hidden z-10 rounded-bl rounded-br transition-all area-select-box'">
      <div class="inline-flex flex-col justify-start items-center w-5/12 md:w-1/2 h-full overflow-x-hidden overflow-y-scroll">
        <div v-for="(item, index) in areaList" @click="changeAreaFirstSelectedIndex(index)" :class="'inline-flex flex-col justify-center items-start w-full p-2 whitespace-nowrap cursor-pointer transition-all' + (index === areaFirstSelectedIndex ? ' selected' : '') + (index === areaFirstSelectedIndex && areaFirstSelectedIndex > 0 ? ' font-orange' : '')">{{ item.name }}</div>
      </div>
      <div class="inline-flex flex-col justify-start items-center w-7/12 md:w-1/2 h-full overflow-x-hidden overflow-y-scroll">
        <div v-for="(item, index) in areaList[areaFirstSelectedIndex].childs" @click="changeAreaSecondSelectedIndex(index)" :class="'inline-flex flex-col justify-center items-start w-full p-2 whitespace-nowrap cursor-pointer transition-all' + (index === areaSecondSelectedIndex ? ' selected' : '') + (index === areaSecondSelectedIndex && areaFirstSelectedIndex > 0 ? ' font-orange' : '')">{{ item.name }}</div>
      </div>
    </div>
  </div>
  </ClientOnly>
  <!-- pc端筛选 -->
  <ClientOnly>
  <div class="hidden md:flex flex-col w-full lg:w-3/4 lg:mx-auto py-4 rounded-lg select-none select-box-pc">
    <div class="px-4 text-lg pb-4 mb-3 border-b-2 border-solid select-box-pc-title">筛选条件</div>
    <!-- 已选条件 -->
    <div :class="'relative inline-flex flex-row justify-start ' + (isCanMultiSelectProvince?'items-start':'items-center') + ' w-full text-sm px-4 pb-3 mb-3 border-b-2 border-solid transition-all select-box-pc-selected'">
      <div :class="'inline-flex py-0.5 whitespace-nowrap select-item-title' + (areaList.filter(item=>item.is_selected).length>0?' font-orange':'') + ' transition-all'">已选条件</div>
      <!-- 多选地区条件下 -->
      <div v-if="isCanMultiSelectProvince" class="relative inline-flex flex-row w-full h-auto">
        <div v-if="areaList.filter(item=>item.is_selected).length>0" class="inline-flex flex-row justify-start items-center px-1 py-0.5 ml-4 mr-20 border border-solid transition-all font-orange border-orange">
          <span>省份地区：
            <template v-for="(item, index) in areaList.filter(item=>item.is_selected)">
              <template v-if="item.childs.filter(subitem=>subitem.is_selected).length == item.childs.length - 1">{{ item.name }}</template>
              <template v-else v-for="(subitem, subindex) in item.childs.filter(subitem=>subitem.is_selected)">{{ subitem.name }}
                <template v-if="subindex < item.childs.filter(subitem=>subitem.is_selected).length - 1">，</template>
              </template>
              <template v-if="index < areaList.filter(item=>item.is_selected).length - 1">，</template>
            </template>
          </span>
          <svg @click.stop="clearAllMultiSelectProvinceIsSelected" class="w-3 h-3 ml-1 cursor-pointer transition-all" style="min-width: 0.75rem;min-height: 0.75rem;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
        </div>
        <div @click.stop="clearAllMultiSelectProvinceIsSelected" class="absolute right-0 top-0 bottom-0 inline-flex flex-row justify-center items-baseline py-2.5 pt-0.5 cursor-pointer font-orange">
          <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 23q-2.8 0-5.15-1.275T3 18.325V21H1v-6h6v2H4.525q1.2 1.8 3.163 2.9T12 21q1.875 0 3.513-.713t2.85-1.924q1.212-1.213 1.925-2.85T21 12h2q0 2.275-.863 4.275t-2.362 3.5q-1.5 1.5-3.5 2.363T12 23ZM1 12q0-2.275.863-4.275t2.362-3.5q1.5-1.5 3.5-2.362T12 1q2.8 0 5.15 1.275t3.85 3.4V3h2v6h-6V7h2.475q-1.2-1.8-3.163-2.9T12 3q-1.875 0-3.513.713t-2.85 1.924Q4.426 6.85 3.714 8.488T3 12H1Z"/></svg>
          <span>重置筛选</span>
        </div>
      </div>
      <!-- 单选地区条件下 -->
      <div v-else class="relative inline-flex flex-row w-full h-5 transition-all">
        <template v-if="areaList.filter(item=>{return item.is_selected&&item.childs.filter(subitem=>subitem.is_selected).length>0}).length>0">
          <template v-for="item in areaList.filter(item=>{return item.is_selected&&item.childs.filter(subitem=>subitem.is_selected).length>0})[0].childs.filter(item=>item.is_selected)">
            <div class="inline-flex flex-row justify-start items-center px-1 py-0.5 ml-4 border border-solid transition-all font-orange border-orange">
              <span class="transition-all">{{ item.name }}</span>
              <svg @click.stop="clearAllMultiSelectCityIsSelected" class="w-3 h-3 ml-1 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
            </div>
          </template>
        </template>
        <template v-else>
          <template v-for="item in areaList.filter(item=>item.is_selected)">
            <div class="inline-flex flex-row justify-start items-center px-1 py-0.5 ml-4 border border-solid transition-all font-orange border-orange">
              <span class="transition-all">{{ item.name }}</span>
              <svg @click.stop="clearAllMultiSelectProvinceIsSelected" class="w-3 h-3 ml-1 cursor-pointer transition-all" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
            </div>
          </template>
        </template>
      </div>
    </div>
    <!-- 省份地区 -->
    <div :class="'relative inline-flex flex-row justify-start items-start w-full px-4 pb-2 mb-2 text-sm transition-all'">
      <div class="inline-flex whitespace-nowrap select-item-title transition-all">
        <template v-if="isCanMultiSelectProvince">省份地区</template>
        <template v-else>
          <template v-if="areaList.filter(item=>item.is_selected).length==0">省份地区</template>
          <template v-else>城市&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
        </template>
      </div>
      <div class="relative inline-flex flex-row justify-start items-center w-full text-sm px-4 transition-all">
        <!-- 多选地区 -->
        <div v-if="isCanMultiSelectProvince" @click.stop="isShowMultiSelectProvincePopup?hideMultiSelectProvincePopup():showMultiSelectProvincePopup()" :class="'inline-flex flex-row flex-wrap items-center w-auto cursor-pointer transition-all' + (areaList.filter(item=>item.is_selected).length>0 ? ' font-orange' : '') + ' select-area'">
          <span class="mr-1 transition-all">多选地区<template v-if="areaList.filter(item=>item.is_selected).length>0">&nbsp;{{ areaList.filter(item=>item.is_selected).length }}</template></span>
          <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" :d="'M1 '+arrowY1+'h22L12 '+arrowY2"/></svg>
        </div>
        <!-- 单选地区 -->
        <div v-else :class="'inline-flex flex-row flex-wrap ' + (isShowMoreProvinceSelect ? 'max-h-full' : 'max-h-5') + ' overflow-hidden transition-all select-area'">
          <template v-if="areaList.filter(item=>item.is_selected).length>0">
            <template v-for="(item, index) in areaList.filter(item=>item.is_selected)[0].childs">
              <div v-if="index > 0" @click.stop="changeAreaListCityIsSelectedWithOnlyOne(index)" :class="'mr-4 last-of-type:mr-0 whitespace-nowrap cursor-pointer transition-all' + (item.is_selected ? ' font-orange' : '')">{{ item.name }}</div>
            </template>
          </template>
          <template v-else>
            <template v-for="(item, index) in areaList">
              <div v-if="index > 0" @click.stop="changeAreaListProvinceIsSelectedWithOnlyOne(index)" :class="'mr-4 last-of-type:mr-0 whitespace-nowrap cursor-pointer transition-all' + (item.is_selected ? ' font-orange' : '')">{{ item.name }}</div>
            </template>
          </template>
        </div>
      </div>
      <!-- 单选地区的“更多”按钮，展开或收起 -->
      <div v-if="!isCanMultiSelectProvince" @click.stop="isShowMoreProvinceSelect = !isShowMoreProvinceSelect" class="inline-flex flex-row items-center whitespace-nowrap ml-4 cursor-pointer transition-all select-item-title-expand-more-button">
        更多
        <svg v-if="isShowMoreProvinceSelect" class="w-4 h-4 ml-1 transition-all" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m16 6.594l-.72.687l-12.5 12.5l1.44 1.44L16 9.437l11.78 11.78l1.44-1.437l-12.5-12.5l-.72-.686z"/></svg>
        <svg v-else class="w-4 h-4 ml-1 transition-all" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m4.22 10.78l-1.44 1.44l12.5 12.5l.72.686l.72-.687l12.5-12.5l-1.44-1.44L16 22.564L4.22 10.78z"/></svg>
      </div>
      <!-- “多选”或“取消多选”按钮 -->
      <div @click.stop="changeIsCanMultiSelectProvince" :class="'inline-flex flex-row items-center whitespace-nowrap ml-4 cursor-pointer transition-all ' + (isCanMultiSelectProvince ? 'to-cancel-multi-select-province' : 'font-orange')">
        <template v-if="isCanMultiSelectProvince">取消多选</template>
        <template v-else>
          <svg class="w-4 h-4 mr-1 transition-all" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path stroke-width="2" stroke="currentColor" id="svg_1" d="m16.76341,5.40201 v-3 h-15 v15 h3.2 v-11.3 h10z" /><rect stroke-width="2" stroke="currentColor" fill="transparent" id="svg_2" height="14.71381" width="15" y="6" x="5.5329"/><line stroke-width="2" stroke="currentColor" id="svg_3" y2="18.99872" x2="12.14711" y1="14.02504" x1="7.31839"/><path stroke-width="2" stroke="currentColor" id="svg_4" d="m19.20346,8.98684l-7.51799,10.2157"/></g></svg>
          多选
        </template>
      </div>
      <!-- 多选地区弹出框 -->
      <div @click.stop.prevent="hideMultiSelectProvincePopup" :class="'fixed '+ (isShowMultiSelectProvincePopup ? 'left-0 top-0 w-full h-full' : 'left-1/2 top-1/2 w-0 h-0') + ' z-10 transition-all'"></div>
      <div @click.stop.prevent="false" :class="'absolute left-20 top-5 w-96 ' + (isShowMultiSelectProvincePopup ? 'max-h-screen' : 'max-h-0') + ' ml-2 z-20 rounded-lg overflow-hidden transition-all'" style="background-color: rgb(70,70,70);">
        <div class="relative mt-4 ml-4 transition-all">
          <input class="w-48 h-6 pl-6 py-3 ml-0 text-white bg-transparent border border-solid border-neutral-800 rounded-md transition-all outline-none area-search-text" placeholder="输入地区名称搜索" v-model="areaSearchText" @keyup="filterAreaSearchHandle" />
          <svg class="absolute left-1.5 top-0.5 inline-block w-4 h-6 transition-all" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z"/></svg>
        </div>
        <div class="inline-flex flex-row w-full max-h-52 mt-4 border-t border-solid border-gray-800 rounded-b-lg" style="background-color: rgb(70,70,70);">
          <div class="inline-flex flex-col w-1/2 h-auto overflow-y-scroll">
            <template v-for="(item, index) in areaList">
              <div v-if="index > 0" @click.stop="changeAreaFirstSelectedIndex(index)" :class="(item.is_show ? '' : 'hidden ') + 'relative inline-flex flex-row items-center mx-2 my-1 cursor-pointer transition-all select-area-list-item'">
                <svg @click.stop="changeAreaFirstIsSelected(index)" class="w-4 h-4 transition-all font-orange" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g id="Layer_1">
                    <rect class="transition-all" rx="2" :fill="item.is_selected ? 'currentColor' : 'transparent'" x="0.99319" y="0.95587" width="22" height="22" id="svg_2" :stroke="item.is_selected ? 'currentColor' : 'white'" stroke-width="2"/>
                    <line v-if="item.is_selected" class="transition-all" stroke="rgb(70,70,70)" fill="none" x1="5" y1="11" x2="10" y2="19.75534" id="svg_3" stroke-width="2"/>
                    <path v-if="item.is_selected" class="transition-all" stroke="rgb(70,70,70)" fill="none" opacity="undefined" d="m19.9316,4.06882l-10.67057,15.63814" id="svg_4" stroke-width="2"/>
                  </g>
                </svg>
                <span :class="'ml-1 transition-all' + (item.is_selected || index === areaFirstSelectedIndex ? ' font-orange' : '')">{{ item.name }}</span>
                <svg :class="'absolute right-0 w-3 h-3 transition-all' + (index === areaFirstSelectedIndex ? ' font-orange' : '')" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path class="transition-all" fill="currentColor" d="M1,2V22L21 11"/></svg>
              </div>
            </template>
          </div>
          <div class="inline-flex flex-col w-1/2 h-auto overflow-y-scroll">
            <template v-for="(item, index) in areaList[areaFirstSelectedIndex].childs">
              <div v-if="index > 0" @click.stop="changeAreaSecondIsSelected(index)" :class="(item.is_show ? '' : 'hidden ') + 'inline-flex flex-row items-center ml-2 my-1 cursor-pointer transition-all select-area-list-item'">
                <svg class="w-4 h-4 transition-all font-orange" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g id="Layer_1">
                    <rect class="transition-all" rx="2" :fill="item.is_selected ? 'currentColor' : 'transparent'" x="0.99319" y="0.95587" width="22" height="22" id="svg_2" :stroke="item.is_selected ? 'currentColor' : 'white'" stroke-width="2"/>
                    <line v-if="item.is_selected" class="transition-all" stroke="rgb(70,70,70)" fill="none" x1="5" y1="11" x2="10" y2="19.75534" id="svg_3" stroke-width="2"/>
                    <path v-if="item.is_selected" class="transition-all" stroke="rgb(70,70,70)" fill="none" opacity="undefined" d="m19.9316,4.06882l-10.67057,15.63814" id="svg_4" stroke-width="2"/>
                  </g>
                </svg>
                <span :class="'ml-1 transition-all' + (item.is_selected ? ' font-orange' : '')">{{ item.name }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 商家距离 -->
    <div class="inline-flex flex-row justify-start items-center w-full px-4 text-sm transition-all">
      <div class="inline-flex whitespace-nowrap transition-all select-item-title">商家距离</div>
      <div class="inline-flex flex-row flex-wrap items-center ml-4 transition-all busines-distance">
        <div @click.stop="changeToSwitchArea" class="mr-4 whitespace-nowrap cursor-pointer transition-all">全部</div>
        <div @click.stop="changeToLeaveMeClosestDistance" :class="'mr-0 whitespace-nowrap cursor-pointer transition-all' + (isLeaveMeClosestDistance ? ' font-orange' : '')">离我最近</div>
        <div v-if="isLeaveMeClosestDistance" @click.stop="changeToLeaveMeClosestDistance" class="inline-flex flex-row justify-center items-center py-0.5 ml-2 border border-solid border-current rounded-sm cursor-pointer transition-all font-orange">
          <svg class="w-3 md:w-4 h-3 md:h-4 mx-1 transition-all" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144Zm0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64Z"/></svg>
          {{ areaList.filter(item=>item.is_selected).length>0?areaList.filter(item=>item.is_selected)[0].name+(areaList.filter(item=>item.is_selected)[0].childs.filter(item=>item.is_selected).length>0?areaList.filter(item=>item.is_selected)[0].childs.filter(item=>item.is_selected)[0].name:''):'' }}
          <svg class="w-3 md:w-4 h-3 md:h-4 mx-1 transition-all" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"/></svg>
        </div>
      </div>
    </div>
  </div>
  </ClientOnly>
  <ClientOnly>
  <div class="inline-block md:block w-full lg:w-3/4 min-h-screen mt-1 md:mt-0 lg:mx-auto text-sm transition-all search-result">
    <div class="px-4 py-2 mt-10 md:mt-0 transition-all search_find_num_tips">为你找到了<span class="mx-1 transition-all font-orange">{{ totalCountOfSearchResult }}</span>条相关结果</div>
    <!-- 搜索结果列表 -->
    <div class="inline-flex flex-col w-full search-result-list transition-all">
      <!-- 搜索结果项 -->
      <NuxtLink :to="'/detail?id=' + item.id" @click="recordClickItem(item)" class="relative inline-flex flex-col py-4 mt-4 first-of-type:mt-0 rounded-xl first-of-type:rounded-t-none md:first-of-type:rounded-t-xl transition-all search-list-item" v-for="(item, index) in searchResultList">
        <!-- 搜索结果项 - 第一行 -->
        <div class="inline-flex flex-row px-4">
          <img v-if="item.company_img && typeof item.company_img == 'string' && item.company_img.length > 0" class="w-8 h-8 md:w-24 md:h-24 rounded-md blur-md search-list-item-logo" :src="item.company_img" />
          <div v-else class="inline-flex justify-center items-center w-8 h-8 md:w-24 md:h-24 text-center rounded-md select-none whitespace-pre search-list-item-logo" :style="'min-width: 2rem;background-color: ' + item.word_logo_bg_color + ';'">
            <span :class="'font-sans '+(item.short_name.length>1?'text-xs md:text-4xl word-logo-multi-words':'text-xl md:text-7xl word-logo-one-word')+' font-medium'">{{ item.short_name }}</span>
          </div>
          <div class="inline-flex flex-row items-center w-11/12 md:w-10/12 h-full pl-2 md:pl-4">
            <span class=" max-w-max text-base md:text-2xl md:font-bold whitespace-nowrap overflow-hidden text-ellipsis search-list-item-title">{{ item.company_name }}</span>
            <span :class="'inline-block w-max h-max px-1 ml-2 text-xs border border-solid border-current rounded whitespace-nowrap ' + (item.operation_state=='存续'?'cunxu':'') + (item.operation_state=='在业'?'zaiye':'') + (item.operation_state=='开业'?'kaiye':'') + (item.operation_state=='注销'?'zhuxiao':'') + (item.operation_state=='吊销'?'diaoxiao':'') + (item.operation_state=='迁出'?'qianchu':'') + (item.operation_state=='迁入'?'qianru':'') + (item.operation_state=='停业'?'tingye':'') + (item.operation_state=='清算'?'qingsuan':'')">{{ item.operation_state }}</span>
          </div>
        </div>
        <!-- 搜索结果项 - 第二行 -->
        <div class="inline-flex md:hidden flex-row justify-evenly text-xs px-4 mt-2 search-list-item-sec_line">
          <div class="inline-flex flex-col items-center">
            <span>法定代表人</span>
            <span class="mt-1">{{ item.corporation && item.corporation.length > 0 ? item.corporation : '-' }}</span>
          </div>
          <div class="inline-flex flex-col items-center">
            <span>成立日期</span>
            <span class="mt-1">{{ item.foundation_date && item.foundation_date.length > 0 ? item.foundation_date : '-' }}</span>
          </div>
          <div class="inline-flex flex-col items-center">
            <span>电话</span>
            <div class="inline-flex flex-row items-center mt-1">
              <span>{{ item.contact_phone && item.contact_phone.length > 0 ? item.contact_phone : '-' }}</span>
              <button v-if="typeof item.contact_phone === 'object' && item.contact_phone instanceof Array && item.contact_phone.length > 1" @click.stop.prevent="showAllPhone(index)" class="ml-1 font-orange">更多</button>
            </div>
          </div>
        </div>
        <div class="hidden md:inline-flex flex-row justify-between w-3/4 mx-4 pl-28 whitespace-nowrap">
          <div class="inline-flex flex-row ml-0">
            <span clas="whitespace-nowrap">法定代表人：</span>
            <span class="text-white whitespace-nowrap">{{ item.corporation && item.corporation.length > 0 ? item.corporation : '-' }}</span>
          </div>
          <div class="inline-flex flex-row ml-1">
            <span class="whitespace-nowrap">成立日期：</span>
            <span class="text-white whitespace-nowrap">{{ item.foundation_date && item.foundation_date.length > 0 ? item.foundation_date : '-' }}</span>
          </div>
          <div class="inline-flex flex-row ml-1">
            <span class="whitespace-nowrap">社会统一信用代码：</span>
            <span class="text-white whitespace-nowrap">{{ item.credit_code && item.credit_code.length > 0 ? item.credit_code : '-' }}</span>
          </div>
        </div>
        <div class="hidden md:inline-flex flex-row justify-between w-3/4 mx-4 mt-0 pl-28">
          <div class="inline-flex flex-row">
            <span class="whitespace-nowrap">电话：</span>
            <div>
              <span class="text-white whitespace-nowrap">{{ item.contact_phone && item.contact_phone.length > 0 ? item.contact_phone : '-' }}</span>
              <button v-if="typeof item.contact_phone === 'object' && item.contact_phone instanceof Array && item.contact_phone.length > 1" @click.stop.prevent="showAllPhoneByPc(index)" class="ml-1 font-orange">更多</button>
            </div>
          </div>
          <div class="inline-flex flex-row">
            <span class="whitespace-nowrap">邮箱：</span>
            <span class="text-white whitespace-nowrap">{{ item.email && item.email.length > 0 ? item.email : '-' }}</span>
          </div>
        </div>
        <!-- 搜索结果项 - 第三行 -->
        <div class="inline-flex w-full md:w-auto text-xs md:text-sm px-4 pt-4 md:pl-28 md:pt-0 mt-4 md:mt-0 md:mx-4 whitespace-nowrap overflow-hidden border-t md:border-t-0 border-solid" style="border-color: #3c3c3c;">注册地址：<span class="inline-block w-full text-xs md:text-sm text-white whitespace-nowrap text-ellipsis overflow-hidden">{{ item.address && item.address.length > 0 ? item.address : '-' }}</span></div>
        <!-- 搜索结果项 - 第四行 -->
        <div class="inline-flex w-full md:w-auto text-xs md:text-sm px-4 pt-4 md:pl-28 md:pt-0 mt-4 md:mt-0 md:mx-4 whitespace-nowrap overflow-hidden border-t md:border-t-0 border-solid" style="border-color: #3c3c3c;">经营范围：<span class="inline-block w-full text-xs md:text-sm text-white whitespace-nowrap text-ellipsis overflow-hidden">{{ item.business_scope && item.business_scope.length > 0 ? item.business_scope : '-' }}</span></div>
        <div class="absolute">
          <div @click.stop.prevent="hidePhonePopupByPc" :class="'fixed ' + (item.is_show_phone_popup ? 'left-0 top-0 w-full h-full' : 'left-1/2 top-1/2 w-0 h-0') + ' overflow-hidden z-10 cursor-default transition-all'"></div>
          <div @click.stop.prevent="false" :class="'absolute left-32 top-24 inline-flex w-44 ' + (item.is_show_phone_popup ? 'max-h-screen p-2' : 'max-h-0 p-0') + ' bg-white overflow-hidden z-20 rounded-lg shadow shadow-black cursor-default transition-all'">
            <svg @click.stop.prevent="hidePhonePopupByPc" class="absolute right-1 top-1 w-4 h-4" style="color: rgb(153,153,153);cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
            <div class="inline-flex flex-col items-center h-full mt-1">
              <div class="inline-flex justify-start w-full h-full py-1 text-black" v-for="subitem in item.contact_phone">{{ subitem }}</div>
            </div>
          </div>
        </div>
      </NuxtLink>
      <ClientOnly>
        <div :class="'relative ' + (!isHasMoreSearchResultList || currentPage > totalPages || isSearchResultListPending ? 'hidden' : 'inline-flex') + ' md:hidden flex-row justify-center items-center py-1 mt-4 rounded-xl first-of-type:rounded-t-none md:first-of-type:rounded-t-xl search-list-item load-more-tips'" style="color: rgb(151,151,151);">
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>
          <span>加载中...</span>
        </div>
      </ClientOnly>
    </div>
  </div>
  </ClientOnly>
  <ClientOnly>
  <div class="relative hidden md:inline-flex justify-center items-center w-full text-xs my-8 pagination" :style="'--real-width:'+headerWidth+';'">
    <template v-if="currentPage > 1">
      <div class="inline-flex justify-center items-center mr-5 page-button" @click="jumpToPrevPage">上一页</div>
    </template>
    <template v-for="i in paginationArr">
      <div v-if="(typeof i === 'number')" :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === i ? ' selected' : '')" @click="(currentPage === i ? function(){} : jumpToPage(i))">{{ i }}</div>
      <div v-else class="inline-flex justify-center items-center mr-5 ellipsis">{{ i }}</div>
    </template>
    <div class="inline-flex justify-center items-center mr-5 jump-to">
      <span>跳到</span>
      <input class="w-16 mx-2 text-center" type="text" v-model="inputPage" @keyup.enter="jumpToInputPage" />
      <button @click="jumpToInputPage">确定</button>
    </div>
    <template v-if="currentPage < totalPages">
      <div class="inline-flex justify-center items-center mr-5 page-button" @click="jumpToNextPage">下一页</div>
    </template>
  </div>
  </ClientOnly>
  <!-- 电话号码展示弹窗 -->
  <ClientOnly>
  <div @click.stop="hidePhonePopup" :class="'fixed ' + (isShowPhonePopup ? 'left-0 top-0' : 'left-1/2 top-1/2') + ' inline-flex justify-center items-center ' + (isShowPhonePopup ? 'w-full h-full' : 'w-0 h-0') + ' bg-black bg-opacity-50 transition-all'">
    <div @click.stop="false" :class="'inline-flex flex-col w-3/4 md:w-1/2 lg:w-1/3 ' + (isShowPhonePopup ? 'max-h-screen' : 'max-h-0') + ' min-h-max px-2 ' + (isShowPhonePopup ? 'py-4' : 'py-0') + ' bg-white text-black rounded-xl overflow-hidden shadow transition-all'">
      <div class="relative inline-flex justify-center items-center text-xl font-bold">
        <div>电话号码</div>
        <svg @click.stop="hidePhonePopup" class="absolute right-0 top-0 w-5 h-5" style="color: rgb(153,153,153);cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
      </div>
      <div class="inline-flex flex-col items-center h-full mt-2">
        <div class="inline-flex justify-center w-full h-full py-4 border-t border-solid last-of-type:border-b" v-for="item in searchResultList[showPhoneIndex]?.contact_phone">{{ item }}</div>
      </div>
    </div>
  </div>
  </ClientOnly>
  <!-- 获取定位权限询问弹窗 -->
  <ClientOnly>
  <div @click.stop="hideAskForGetPositionPopup" :class="'fixed ' + (isShowAskForGetPositionPopup ? 'left-0 top-0' : 'left-1/2 top-1/2') + ' inline-flex justify-center items-center ' + (isShowAskForGetPositionPopup ? 'w-full h-full' : 'w-0 h-0') + ' bg-black bg-opacity-50 transition-all'">
    <div @click.stop="false" :class="'inline-flex flex-col w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 ' + (isShowAskForGetPositionPopup ? 'max-h-screen' : 'max-h-0') + ' min-h-max px-2 ' + (isShowAskForGetPositionPopup ? 'py-4' : 'py-0') + ' bg-white text-black rounded-xl overflow-hidden shadow transition-all'">
      <div class="relative inline-flex justify-center items-center text-base md:text-xl font-medium">
        <div>&nbsp;</div>
        <svg @click.stop="hideAskForGetPositionPopup" class="absolute right-0 top-0 w-5 h-5" style="color: rgb(153,153,153);cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
      </div>
      <div class="relative inline-flex justify-center items-center text-base md:text-xl font-normal" style="color: #333333;">
        <div>查查木材商想要获取你的定位</div>
      </div>
      <div class="inline-flex flex-row justify-center items-center h-full mt-2 text-sm md:text-base" style="color: #333333;">
        <svg class="w-3 md:w-4 h-3 md:h-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144Zm0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64Z"/></svg>
        <div>获取你的位置</div>
      </div>
      <div class="inline-flex flex-row justify-evenly h-full mt-4 text-base">
        <div @click.stop="allowGetPositionClickHandle" class="inline-flex justify-center items-center text-base px-4 py-1 border border-solid border-current rounded cursor-pointer" style="color: #20B16A;">允许</div>
        <div @click.stop="denyGetPositionClickHandle" class="inline-flex justify-center items-center text-base px-4 py-1 border border-solid border-current rounded cursor-pointer" style="color: #999999;">禁止</div>
      </div>
    </div>
  </div>
  </ClientOnly>
</template>

<style scoped>
.area-select-box-cover {
  background-color: rgba(0,0,0,0.5);
}

.area-select-box {
  height: 50vh;
  background-color: rgb(30,30,30);
  box-shadow: 0px 20px 20px 0px #151515;
}

::-webkit-scrollbar {
  height: .5rem;
  width: .25rem;
}

::-webkit-scrollbar:horizontal {
  height: .25rem;
  width: .5rem;
}

::-webkit-scrollbar-track {
  background-color: rgb(70, 70, 70);
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb {
  --tw-border-opacity: 1;
  background-color: rgba(255,255,255,0.2);
  border-radius: 9999px;
  border-width: 1px;
}

::-webkit-scrollbar-thumb:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(255,255,255,0.4);
}

::-webkit-scrollbar-thumb:active {
  background-color: rgba(255,255,255,.9);
}

.area-select-box ::-webkit-scrollbar-thumb {
  visibility: hidden;
}

.area-select-box:hover ::-webkit-scrollbar-thumb {
  visibility: visible;
}

.area-select-box > div {
  overflow-y: overlay;
}

.area-select-box > div:first-of-type {
  background: rgb(23,23,23);
}

.area-select-box > div:first-of-type div.selected {
  background: rgb(30,30,30);
}

.area-select-box > div:last-of-type {
  background: rgb(30,30,30);
}

.area-select-box > div:last-of-type div.selected {

}

.search_find_num_tips {
  color: rgb(153,153,153);
}

.search_find_num_tips:hover {
  color: #bdbdbd;
}

@media (max-width: 767px) {
  .search_find_num_tips {
    background-color: rgb(18,18,19);
  }
}

@media (min-width: 1024px) {
  .search_find_num_tips {
    margin-top: calc(100vw / 1920 * 32);
  }
}

.search-list-item {
  background-color: rgb(27,27,27);
}

.search-list-item:hover {
  background-color: #141414;
}

.cunxu,
.zaiye,
.kaiye,
.qianchu,
.qianru {
  color: rgb(31,167,101);
}

.zhuxiao {
  color: rgb(107, 114, 128);
}

.diaoxiao,
.tingye,
.qingsuan {
  color: rgb(239, 68, 68);
}

.select-box-pc {
  background-color: rgb(45,45,45);
}

.select-box-pc-title,
.select-box-pc-selected {
  border-color: #282828;
}

.area-search-text:hover,
.area-search-text:focus-visible {
  border-color: #000000;  
}
.area-search-text ~ svg {
  color: rgb(153,153,153);
}
.area-search-text:hover ~ svg,
.area-search-text:focus-visible ~ svg {
  color: #bdbdbd;
}

.select-item-title,
.select-item-title-expand-more-button,
.to-cancel-multi-select-province,
.search-list-item > div:nth-of-type(2) > div > span:nth-of-type(1),
.search-list-item > div:nth-of-type(3),
.search-list-item > div:nth-of-type(4),
.search-list-item > div:nth-of-type(5),
.search-list-item > div:nth-of-type(6) {
  color: rgb(151,151,151);
}

div:hover > .select-item-title:not(.font-orange),
:where(.select-item-title-expand-more-button,
.to-cancel-multi-select-province):hover {
  color: #cbcbcb;
}

.select-area:not(.font-orange) > :where(div,span,svg):hover,
.busines-distance >div:not(.font-orange):hover,
.select-area-list-item:hover > :not(.font-orange) {
  color: #cdcdcd;
}

.select-area-list-item:hover > .font-orange {
  color: #feae67;
}

.search-list-item > div:nth-of-type(3),
.search-list-item > div:nth-of-type(4) {
  border-top-width: 1px;
  border-color: rgb(39,39,39);
}

.search-list-item-sec_line > div {
  max-width: 33%;
}

.search-list-item-sec_line > div:first-of-type span:last-of-type {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.font-orange {
  color: rgb(253,148,53);
}

.border-orange {
  border-color: rgb(253,148,53);
}

div:hover > .select-item-title.font-orange,
.font-orange:hover {
  color: #feae67;
  border-color: #feae67;
}

.pagination,
.pagination * {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.pagination .page-button {
  color: #999999;
  padding: 4.5px 10px 4.5px 9px;
  border: 1px solid #5B5A5C;
  border-radius: 2px;
}

.pagination .page-button.selected {
  color: #FFFFFF;
  background: #32323C;
  cursor: default;
}

.pagination .page-button:not(.selected) {
  cursor: pointer;
}

.pagination .page-button:not(.selected):hover {
  color: #bdbdbd;
  border-color: #888885;
}

.pagination .jump-to,
.pagination .ellipsis {
  color: #999999;
}

.pagination .jump-to input {
  width: 4rem;
  background: transparent;
  padding: 4.5px 1px;
  border: 1px solid #5B5A5C;
  border-radius: 2px;
}

.pagination .jump-to input:focus-visible {
  outline: unset;
}

.pagination .jump-to button {
  font-family: Adobe Heiti Std;
  color: #FF9B40;
  padding: 4.5px 10px 4.5px 9px;
  border: 1px solid #5B5A5C;
  border-radius: 2px;
}

.pagination .jump-to input:hover,
.pagination .jump-to input:focus-visible,
.pagination .jump-to button:hover {
  border-color: #888885;
}

.pagination .jump-to button:hover {
  color: #ffb470;
}

@media (max-width: 768px) {
  .search-list-item-logo span {
    letter-spacing: calc(100vw / 750 * 2);
    margin-left: calc(100vw / 750 * 2);
  }
}

@media (min-width: 768px) {
  .area-select-box {
    margin-left: 25%;
  }

  .search-list-item > div {
    border: none;
  }

  .search-list-item > div:not(:first-of-type,:last-of-type) {
    color: rgb(151,151,151);
  }

  .search-list-item > div:not(:first-of-type),
  .search-list-item > div:not(:first-of-type) span {
    font-size: max(12px, calc(100vw / 1920 * 14));
    line-height: calc(100vw / 1920 * 30);
  }

  .search-list-item > div:nth-of-type(3) {
    margin-top: calc(100vw / 1920 * -35);
  }

  .search-list-item > div:nth-of-type(3),
  .search-list-item > div:nth-of-type(4),
  .search-list-item > div:nth-of-type(5),
  .search-list-item > div:nth-of-type(6) {
    padding-left: calc((100vw / 1920 * 88) + 1rem);
  }

  .search-list-item-logo {
    width: calc(100vw / 1920 * 88);
    height: calc(100vw / 1920 * 88);
  }

  .word-logo-one-word {
    font-size: max(12px, calc(100vw / 1920 * 72));
  }

  .word-logo-multi-words {
    font-size: max(12px, calc(100vw / 1920 * 28));
    letter-spacing: calc(100vw / 1920 * 6);
    line-height: calc(100vw / 1920 * 40);
    margin-left: calc(100vw / 1920 * 6);
  }

  .search-list-item-title {
    font-size: max(12px, calc(100vw / 1920 * 30));
    line-height: calc(100vw / 1920 * 48);
  }
  .search-list-item-title + span {
    font-size: max(12px, calc(100vw / 1920 * 12));
    line-height: unset;
    padding: calc(100vw / 1920 * 1) calc(100vw / 1920 * 8);
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .search-list-item-title + span {
    transform: scale(0.85) translateX(-4px);
  }
  .search-list-item > div:nth-of-type(3) {
    margin-top: calc(100vw / 1920 * -25);
  }
}
@media (min-width: 1024px) {
  .select-box-pc,
  .search-result {
    width: calc(100vw / 1920 * 1084);
  }
}
</style>
