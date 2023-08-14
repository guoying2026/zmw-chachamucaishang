<script setup lang="ts">
import { AreaListItem } from '~/types/areaListItem'

import { SearchResultListItem } from '~/types/searchResultListItem'

const route = useRoute()

const nuxtApp = useNuxtApp()

useHead({
  title: '搜索结果',
})

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

const { data, pending, error, refresh } = await useFetch('/api/areaData')

if (data.value) {
  let areaData: AreaListItem[] = JSON.parse(JSON.stringify(data.value.result))
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

const isShowAreaSelect = ref<boolean>(false)

const areaFirstSelectedIndex = ref<number>(0)

const areaSecondSelectedIndex = ref<number>(0)

const isLeaveMeClosestDistance = ref<boolean>(false)

const totalCountOfSearchResult = ref<number>(183949)

const searchResultList = ref<SearchResultListItem[]>([
  {
    id: 1,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '张新田',
    registered_capital: '',
    foundation_date: '2020-04-02',
    operation_state: '在业',
    province: '江苏省',
    city: '宿迁市',
    district: '沐阳县',
    company_sort: '',
    credit_code: '91321322MA215HKM23',
    taxpayer_id: '',
    registration_mark: '',
    organisation_code: '',
    contact_phone: ['13800138000', '15018375194', '17796224896', '17819180351'],
    industry: '',
    address: '宿迁市沐阳县胡集镇梁井村吴组205国道边1号',
    website: '',
    email: 'noreply@qq.com',
    business_scope: '木材加工，人造板制造，人造板销售，软木制品制造',
    company_img: '',
    credit_score: '',
    is_show_phone_popup: false,
  },{
    id: 1,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '张新田',
    registered_capital: '',
    foundation_date: '2020-04-02',
    operation_state: '在业',
    province: '江苏省',
    city: '宿迁市',
    district: '沐阳县',
    company_sort: '',
    credit_code: '91321322MA215HKM23',
    taxpayer_id: '',
    registration_mark: '',
    organisation_code: '',
    contact_phone: '13800138000',
    industry: '',
    address: '宿迁市沐阳县胡集镇梁井村吴组205国道边1号',
    website: '',
    email: 'noreply@qq.com',
    business_scope: '木材加工，人造板制造，人造板销售，软木制品制造',
    company_img: '',
    credit_score: '',
    is_show_phone_popup: false,
  },{
    id: 1,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '张新田',
    registered_capital: '',
    foundation_date: '2020-04-02',
    operation_state: '在业',
    province: '江苏省',
    city: '宿迁市',
    district: '沐阳县',
    company_sort: '',
    credit_code: '91321322MA215HKM23',
    taxpayer_id: '',
    registration_mark: '',
    organisation_code: '',
    contact_phone: '13800138000',
    industry: '',
    address: '宿迁市沐阳县胡集镇梁井村吴组205国道边1号',
    website: '',
    email: 'noreply@qq.com',
    business_scope: '木材加工，人造板制造，人造板销售，软木制品制造',
    company_img: '',
    credit_score: '',
    is_show_phone_popup: false,
  },{
    id: 1,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '张新田',
    registered_capital: '',
    foundation_date: '2020-04-02',
    operation_state: '在业',
    province: '江苏省',
    city: '宿迁市',
    district: '沐阳县',
    company_sort: '',
    credit_code: '91321322MA215HKM23',
    taxpayer_id: '',
    registration_mark: '',
    organisation_code: '',
    contact_phone: '13800138000',
    industry: '',
    address: '宿迁市沐阳县胡集镇梁井村吴组205国道边1号',
    website: '',
    email: 'noreply@qq.com',
    business_scope: '木材加工，人造板制造，人造板销售，软木制品制造',
    company_img: '',
    credit_score: '',
    is_show_phone_popup: false,
  },{
    id: 1,
    company_name: '广东广物木材产业股份有限公司',
    corporation: '张新田',
    registered_capital: '',
    foundation_date: '2020-04-02',
    operation_state: '在业',
    province: '江苏省',
    city: '宿迁市',
    district: '沐阳县',
    company_sort: '',
    credit_code: '91321322MA215HKM23',
    taxpayer_id: '',
    registration_mark: '',
    organisation_code: '',
    contact_phone: '13800138000',
    industry: '',
    address: '宿迁市沐阳县胡集镇梁井村吴组205国道边1号',
    website: '',
    email: 'noreply@qq.com',
    business_scope: '木材加工，人造板制造，人造板销售，软木制品制造',
    company_img: '',
    credit_score: '',
    is_show_phone_popup: false,
  }
])

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

const totalPages = ref<number>(9);

const inputPage = ref<number>(currentPage.value);

const isShowAskForGetPositionPopup = ref<boolean>(false)

/**
 * 上一页
 */
function jumpToPrevPage() {
  if (currentPage.value - 1 > 0) {
    currentPage.value = currentPage.value - 1;
  } else {
    currentPage.value = 1;
  }
}

/**
 * 下一页
 */
function jumpToNextPage() {
  if (currentPage.value + 1 <= totalPages.value) {
    currentPage.value = currentPage.value + 1;
  } else {
    currentPage.value = totalPages.value;
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
  isShowAreaSelect.value = true;
}

/**
 * 隐藏区域筛选弹出框
 */
function hideAreaSelect() {
  isShowAreaSelect.value = false;
}

/**
 * 改变区域选择的省份的高亮选项
 * @param index 
 */
function changeAreaFirstSelectedIndex(index: number) {
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
  }
}

/**
 * 加密手机号码
 * @param phone 
 */
function encryptPhone(phone: string | number | string[]) {
  if (typeof phone === 'object' && phone instanceof Array) {
    phone = phone[0];
  }
  if (typeof phone === 'number') {
    phone = phone.toString();
  }
  phone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1********');
  return phone;
}

/**
 * 显示移动端的电话号码展示弹窗
 */
function showPhonePopup() {
  isShowPhonePopup.value = true
}

/**
 * 隐藏移动端的电话号码展示弹窗
 */
function hidePhonePopup() {
  isShowPhonePopup.value = false
}

/**
 * 移动端的显示更多手机号码的处理事件
 * @param index 
 */
function showAllPhone(index: number) {
  showPhoneIndex.value = index;
  showPhonePopup();
}

/**
 * pc端的显示更多手机号码的处理事件
 * @param index 
 */
function showPhonePopupByPc(index: number) {
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
  showPhonePopupByPc(index);
}

/**
 * 显示多选地区弹出框
 */
function showMultiSelectProvincePopup() {
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
  isShowMultiSelectProvincePopup.value = false;
}

/**
 * 清除所有的省份和地级市的选中状态
 */
function clearAllMultiSelectProvinceIsSelected() {
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
  isLeaveMeClosestDistance.value = false;
}

/**
 * pc端的“商家距离-离我最近”的处理事件
 */
function changeToLeaveMeClosestDistance() {
  showAskForGetPositionPopup();
}

/**
 * 通过ip获取当前地理位置的处理事件，即“获取定位权限询问弹窗”的“允许”的处理事件
 */
async function getAreaInfoByIP() {
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
  isShowAskForGetPositionPopup.value = true;
}

/**
 * 隐藏获取定位权限询问弹窗
 */
function hideAskForGetPositionPopup() {
  isShowAskForGetPositionPopup.value = false;
}
</script>

<template>
  <!-- 移动端筛选 -->
  <div class="fixed md:hidden w-full z-10">
    <!-- 顶部的筛选和排序 -->
    <div class="relative w-full inline-flex flex-row justify-evenly bg-black py-2 z-10">
      <!-- 省份地区 -->
      <div @click="isShowAreaSelect?hideAreaSelect():showAreaSelect()" class="inline-flex flex-row justify-center items-center text-sm font-normal cursor-pointer">
        <span :class="isLeaveMeClosestDistance?'':'font-orange'">{{ areaList[areaFirstSelectedIndex].childs[areaSecondSelectedIndex].name }}</span>
        <svg v-if="isShowAreaSelect" :class="'w-2 h-2 ml-1'+(isLeaveMeClosestDistance?'':' font-orange')" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M1 21h22L12 2"/></svg>
        <svg v-else :class="'w-2 h-2 ml-1'+(isLeaveMeClosestDistance?'':' font-orange')" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M1 3h22L12 22"/></svg>
      </div>
      <!-- 商家距离 -->
      <div @click="changeToLeaveMeClosestDistance" :class="'inline-flex flex-row justify-center items-center text-sm font-normal cursor-pointer' + (isLeaveMeClosestDistance ? ' font-orange' : '')">离我最近</div>
    </div>
    <!-- 区域筛选弹出框 -->
    <div @click="hideAreaSelect" :class="'absolute top-0 left-0 inline-block w-screen ' + (isShowAreaSelect ? 'h-screen' : 'h-0') + ' z-0 transition-all area-select-box-cover'"></div>
    <div :class="'relative w-full md:w-1/2 ' + (isShowAreaSelect ? 'max-h-screen' : 'max-h-0') + ' inline-flex flex-row justify-start items-start text-sm font-normal pr-0.5 overflow-hidden z-10 rounded-bl rounded-br transition-all area-select-box'">
      <div class="inline-flex flex-col justify-start items-center w-5/12 md:w-1/2 h-full overflow-x-hidden overflow-y-scroll">
        <div v-for="(item, index) in areaList" @click="changeAreaFirstSelectedIndex(index)" :class="'inline-flex flex-col justify-center items-start w-full p-2 whitespace-nowrap cursor-pointer' + (index === areaFirstSelectedIndex ? ' selected' : '') + (index === areaFirstSelectedIndex && areaFirstSelectedIndex > 0 ? ' font-orange' : '')">{{ item.name }}</div>
      </div>
      <div class="inline-flex flex-col justify-start items-center w-7/12 md:w-1/2 h-full overflow-x-hidden overflow-y-scroll">
        <div v-for="(item, index) in areaList[areaFirstSelectedIndex].childs" @click="changeAreaSecondSelectedIndex(index)" :class="'inline-flex flex-col justify-center items-start w-full p-2 whitespace-nowrap cursor-pointer' + (index === areaSecondSelectedIndex ? ' selected' : '') + (index === areaSecondSelectedIndex && areaFirstSelectedIndex > 0 ? ' font-orange' : '')">{{ item.name }}</div>
      </div>
    </div>
  </div>
  <!-- pc端筛选 -->
  <div class="hidden md:flex flex-col w-full lg:w-3/4 lg:mx-auto py-4 rounded-xl select-box-pc">
    <div class="px-4 text-lg pb-2 mb-2 border-b border-solid border-gray-950">筛选条件</div>
    <!-- 已选条件 -->
    <div :class="'relative inline-flex flex-row justify-start ' + (isCanMultiSelectProvince?'items-start':'items-center') + ' w-full text-sm px-4 pb-2 mb-2 border-b border-solid border-gray-950 transition-all'">
      <div :class="'inline-flex py-0.5 whitespace-nowrap select-item-title' + (areaList.filter(item=>item.is_selected).length>0?' font-orange':'')">已选条件</div>
      <!-- 多选地区条件下 -->
      <div v-if="isCanMultiSelectProvince" class="relative inline-flex flex-row w-full h-auto">
        <div v-if="areaList.filter(item=>item.is_selected).length>0" class="inline-flex flex-row justify-start items-center px-1 py-0.5 ml-4 mr-20 border border-solid font-orange" style="border-color: rgb(253,148,53);">
          <span>省份地区：
            <template v-for="(item, index) in areaList.filter(item=>item.is_selected)">
              <template v-if="item.childs.filter(subitem=>subitem.is_selected).length == item.childs.length - 1">{{ item.name }}</template>
              <template v-else v-for="(subitem, subindex) in item.childs.filter(subitem=>subitem.is_selected)">{{ subitem.name }}
                <template v-if="subindex < item.childs.filter(subitem=>subitem.is_selected).length - 1">，</template>
              </template>
              <template v-if="index < areaList.filter(item=>item.is_selected).length - 1">，</template>
            </template>
          </span>
          <svg @click.stop="clearAllMultiSelectProvinceIsSelected" class="w-3 h-3 ml-1 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
        </div>
        <div @click.stop="clearAllMultiSelectProvinceIsSelected" class="absolute right-0 top-0 bottom-0 inline-flex flex-row justify-center items-baseline py-2.5 pt-0.5 cursor-pointer font-orange">
          <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 23q-2.8 0-5.15-1.275T3 18.325V21H1v-6h6v2H4.525q1.2 1.8 3.163 2.9T12 21q1.875 0 3.513-.713t2.85-1.924q1.212-1.213 1.925-2.85T21 12h2q0 2.275-.863 4.275t-2.362 3.5q-1.5 1.5-3.5 2.363T12 23ZM1 12q0-2.275.863-4.275t2.362-3.5q1.5-1.5 3.5-2.362T12 1q2.8 0 5.15 1.275t3.85 3.4V3h2v6h-6V7h2.475q-1.2-1.8-3.163-2.9T12 3q-1.875 0-3.513.713t-2.85 1.924Q4.426 6.85 3.714 8.488T3 12H1Z"/></svg>
          <span>重置筛选</span>
        </div>
      </div>
      <!-- 单选地区条件下 -->
      <div v-else class="relative inline-flex flex-row w-full h-5">
        <template v-if="areaList.filter(item=>{return item.is_selected&&item.childs.filter(subitem=>subitem.is_selected).length>0}).length>0">
          <template v-for="item in areaList.filter(item=>{return item.is_selected&&item.childs.filter(subitem=>subitem.is_selected).length>0})[0].childs.filter(item=>item.is_selected)">
            <div class="inline-flex flex-row justify-start items-center px-1 py-0.5 ml-4 border border-solid font-orange" style="border-color: rgb(253,148,53);">
              <span>{{ item.name }}</span>
              <svg @click.stop="clearAllMultiSelectCityIsSelected" class="w-3 h-3 ml-1 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
            </div>
          </template>
        </template>
        <template v-else>
          <template v-for="item in areaList.filter(item=>item.is_selected)">
            <div class="inline-flex flex-row justify-start items-center px-1 py-0.5 ml-4 border border-solid font-orange" style="border-color: rgb(253,148,53);">
              <span>{{ item.name }}</span>
              <svg @click.stop="clearAllMultiSelectProvinceIsSelected" class="w-3 h-3 ml-1 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
            </div>
          </template>
        </template>
      </div>
    </div>
    <!-- 省份地区 -->
    <div :class="'relative inline-flex flex-row justify-start items-start w-full px-4 pb-2 mb-2 text-sm transition-all'">
      <div class="inline-flex whitespace-nowrap select-item-title">
        <template v-if="isCanMultiSelectProvince">省份地区</template>
        <template v-else>
          <template v-if="areaList.filter(item=>item.is_selected).length==0">省份地区</template>
          <template v-else>城市&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
        </template>
      </div>
      <div class="relative inline-flex flex-row justify-start items-center w-full text-sm px-4">
        <!-- 多选地区 -->
        <div v-if="isCanMultiSelectProvince" @click.stop="isShowMultiSelectProvincePopup?hideMultiSelectProvincePopup():showMultiSelectProvincePopup()" :class="'inline-flex flex-row flex-wrap items-center w-auto cursor-pointer' + (areaList.filter(item=>item.is_selected).length>0 ? ' font-orange' : '')">
          <span class="mr-1">多选地区<template v-if="areaList.filter(item=>item.is_selected).length>0">&nbsp;{{ areaList.filter(item=>item.is_selected).length }}</template></span>
          <svg v-if="isShowMultiSelectProvincePopup" class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M1 21h22L12 2"/></svg>
          <svg v-else class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M1 3h22L12 22"/></svg>
        </div>
        <!-- 单选地区 -->
        <div v-else :class="'inline-flex flex-row flex-wrap ' + (isShowMoreProvinceSelect ? 'max-h-full' : 'max-h-5') + ' overflow-hidden transition-all'">
          <template v-if="areaList.filter(item=>item.is_selected).length>0">
            <template v-for="(item, index) in areaList.filter(item=>item.is_selected)[0].childs">
              <div v-if="index > 0" @click.stop="changeAreaListCityIsSelectedWithOnlyOne(index)" :class="'mr-4 last-of-type:mr-0 whitespace-nowrap cursor-pointer' + (item.is_selected ? ' font-orange' : '')">{{ item.name }}</div>
            </template>
          </template>
          <template v-else>
            <template v-for="(item, index) in areaList">
              <div v-if="index > 0" @click.stop="changeAreaListProvinceIsSelectedWithOnlyOne(index)" :class="'mr-4 last-of-type:mr-0 whitespace-nowrap cursor-pointer' + (item.is_selected ? ' font-orange' : '')">{{ item.name }}</div>
            </template>
          </template>
        </div>
      </div>
      <!-- 单选地区的“更多”按钮，展开或收起 -->
      <div v-if="!isCanMultiSelectProvince" @click.stop="isShowMoreProvinceSelect = !isShowMoreProvinceSelect" class="inline-flex flex-row items-center whitespace-nowrap ml-4 cursor-pointer select-item-title-expand-more-button">
        更多
        <svg v-if="isShowMoreProvinceSelect" class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m16 6.594l-.72.687l-12.5 12.5l1.44 1.44L16 9.437l11.78 11.78l1.44-1.437l-12.5-12.5l-.72-.686z"/></svg>
        <svg v-else class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m4.22 10.78l-1.44 1.44l12.5 12.5l.72.686l.72-.687l12.5-12.5l-1.44-1.44L16 22.564L4.22 10.78z"/></svg>
      </div>
      <!-- “多选”或“取消多选”按钮 -->
      <div @click.stop="changeIsCanMultiSelectProvince" :class="'inline-flex flex-row items-center whitespace-nowrap ml-4 cursor-pointer ' + (isCanMultiSelectProvince ? 'to-cancel-multi-select-province' : 'font-orange')">
        <template v-if="isCanMultiSelectProvince">取消多选</template>
        <template v-else>
          <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><path stroke-width="2" stroke="currentColor" id="svg_1" d="m16.76341,5.40201 v-3 h-15 v15 h3.2 v-11.3 h10z" /><rect stroke-width="2" stroke="currentColor" fill="transparent" id="svg_2" height="14.71381" width="15" y="6" x="5.5329"/><line stroke-width="2" stroke="currentColor" id="svg_3" y2="18.99872" x2="12.14711" y1="14.02504" x1="7.31839"/><path stroke-width="2" stroke="currentColor" id="svg_4" d="m19.20346,8.98684l-7.51799,10.2157"/></g></svg>
          多选
        </template>
      </div>
      <!-- 多选地区弹出框 -->
      <div @click.stop.prevent="isShowMultiSelectProvincePopup = false" :class="'fixed '+ (isShowMultiSelectProvincePopup ? 'left-0 top-0 w-full h-full' : 'left-1/2 top-1/2 w-0 h-0') + ' z-10 transition-all'"></div>
      <div @click.stop.prevent="false" :class="'absolute left-20 top-5 w-96 ' + (isShowMultiSelectProvincePopup ? 'max-h-screen' : 'max-h-0') + ' ml-2 z-20 rounded-lg overflow-hidden transition-all'" style="background-color: rgb(70,70,70);">
        <div class="relative mt-4 ml-4">
          <input class="w-48 h-6 pl-6 py-3 ml-0 text-white bg-transparent border-2 border-solid border-neutral-700 rounded-md focus-visible:outline-none" placeholder="输入地区名称搜索" v-model="areaSearchText" @keyup="filterAreaSearchHandle" />
          <svg class="absolute left-1.5 top-0.5 inline-block w-4 h-6" style="color: rgb(153,153,153);" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208c0-220.912-179.088-400-400-400s-400 179.088-400 400s179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0c12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z"/></svg>
        </div>
        <div class="inline-flex flex-row w-full max-h-52 mt-4 border-t border-solid border-gray-950 rounded-b-lg" style="background-color: rgb(70,70,70);">
          <div class="inline-flex flex-col w-1/2 h-auto overflow-y-scroll">
            <template v-for="(item, index) in areaList">
              <div v-if="index > 0" @click.stop="changeAreaFirstSelectedIndex(index)" :class="(item.is_show ? '' : 'hidden ') + 'relative inline-flex flex-row items-center mx-2 my-1 cursor-pointer'">
                <svg @click.stop="changeAreaFirstIsSelected(index)" class="w-4 h-4" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g id="Layer_1">
                    <rect rx="2" :fill="item.is_selected ? 'rgb(253,148,53)' : 'transparent'" x="0.99319" y="0.95587" width="22" height="22" id="svg_2" :stroke="item.is_selected ? 'rgb(253,148,53)' : 'white'" stroke-width="2"/>
                    <line v-if="item.is_selected" stroke="rgb(70,70,70)" fill="none" x1="5" y1="11" x2="10" y2="19.75534" id="svg_3" stroke-width="2"/>
                    <path v-if="item.is_selected" stroke="rgb(70,70,70)" fill="none" opacity="undefined" d="m19.9316,4.06882l-10.67057,15.63814" id="svg_4" stroke-width="2"/>
                  </g>
                </svg>
                <span :class="'ml-1' + (item.is_selected || index === areaFirstSelectedIndex ? ' font-orange' : '')">{{ item.name }}</span>
                <svg :class="'absolute right-0 w-3 h-3' + (index === areaFirstSelectedIndex ? ' font-orange' : '')" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M1,2V22L21 11"/></svg>
              </div>
            </template>
          </div>
          <div class="inline-flex flex-col w-1/2 h-auto overflow-y-scroll">
            <template v-for="(item, index) in areaList[areaFirstSelectedIndex].childs">
              <div v-if="index > 0" @click.stop="changeAreaSecondIsSelected(index)" :class="(item.is_show ? '' : 'hidden ') + 'inline-flex flex-row items-center ml-2 my-1 cursor-pointer'">
                <svg class="w-4 h-4" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g id="Layer_1">
                    <rect rx="2" :fill="item.is_selected ? 'rgb(253,148,53)' : 'transparent'" x="0.99319" y="0.95587" width="22" height="22" id="svg_2" :stroke="item.is_selected ? 'rgb(253,148,53)' : 'white'" stroke-width="2"/>
                    <line v-if="item.is_selected" stroke="rgb(70,70,70)" fill="none" x1="5" y1="11" x2="10" y2="19.75534" id="svg_3" stroke-width="2"/>
                    <path v-if="item.is_selected" stroke="rgb(70,70,70)" fill="none" opacity="undefined" d="m19.9316,4.06882l-10.67057,15.63814" id="svg_4" stroke-width="2"/>
                  </g>
                </svg>
                <span :class="'ml-1' + (item.is_selected ? ' font-orange' : '')">{{ item.name }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 商家距离 -->
    <div class="inline-flex flex-row justify-start items-center w-full px-4 text-sm">
      <div class="inline-flex whitespace-nowrap select-item-title">商家距离</div>
      <div class="inline-flex flex-row flex-wrap items-center ml-4">
        <div @click.stop="changeToSwitchArea" class="mr-4 whitespace-nowrap cursor-pointer">全部</div>
        <div @click.stop="changeToLeaveMeClosestDistance" :class="'mr-0 whitespace-nowrap cursor-pointer' + (isLeaveMeClosestDistance ? ' font-orange' : '')">离我最近</div>
        <div v-if="isLeaveMeClosestDistance" @click.stop="changeToLeaveMeClosestDistance" class="inline-flex flex-row justify-center items-center py-0.5 ml-2 border border-solid border-current rounded-sm cursor-pointer font-orange">
          <svg class="w-3 md:w-4 h-3 md:h-4 mx-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144Zm0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64Z"/></svg>
          {{ areaList.filter(item=>item.is_selected).length>0?areaList.filter(item=>item.is_selected)[0].name+(areaList.filter(item=>item.is_selected)[0].childs.filter(item=>item.is_selected).length>0?areaList.filter(item=>item.is_selected)[0].childs.filter(item=>item.is_selected)[0].name:''):'' }}
          <svg class="w-3 md:w-4 h-3 md:h-4 mx-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"/></svg>
        </div>
      </div>
    </div>
  </div>
  <div class="inline-block md:block w-full lg:w-3/4 min-h-screen mt-1 md:mt-0 lg:mx-auto text-sm">
    <div class="px-4 py-2 mt-10 md:mt-0 search_find_num_tips">为你找到了<span class="mx-1 font-orange">{{ totalCountOfSearchResult }}</span>条相关结果</div>
    <!-- 搜索结果列表 -->
    <div class="inline-flex flex-col w-full">
      <!-- 搜索结果项 -->
      <NuxtLink to="detail" class="relative inline-flex flex-col py-4 mt-4 first-of-type:mt-0 rounded-xl first-of-type:rounded-t-none md:first-of-type:rounded-t-xl search-list-item" v-for="(item, index) in searchResultList">
        <!-- 搜索结果项 - 第一行 -->
        <div class="inline-flex flex-row px-4">
          <img class="w-8 h-8 md:w-24 md:h-24 rounded-md" :src="item.company_img" />
          <div class="inline-flex flex-row items-center h-full pl-2 md:pl-4">
            <span class="md:text-2xl md:font-bold">{{ item.company_name }}</span>
            <span class="inline-block w-max h-max px-1 ml-2 text-xs border border-solid rounded zaiye">{{ item.operation_state }}</span>
          </div>
        </div>
        <!-- 搜索结果项 - 第二行 -->
        <div class="inline-flex md:hidden flex-row justify-evenly text-xs px-4 mt-2">
          <div class="inline-flex flex-col items-center">
            <span>法定代表人</span>
            <span class="mt-1">{{ item.corporation }}</span>
          </div>
          <div class="inline-flex flex-col items-center">
            <span>成立日期</span>
            <span class="mt-1">{{ item.foundation_date }}</span>
          </div>
          <div class="inline-flex flex-col items-center">
            <span>电话</span>
            <div class="inline-flex flex-row items-center mt-1">
              <span>{{ encryptPhone(item.contact_phone) }}</span>
              <button v-if="typeof item.contact_phone === 'object' && item.contact_phone instanceof Array && item.contact_phone.length > 1" @click.stop.prevent="showAllPhone(index)" class="ml-1 font-orange">更多</button>
            </div>
          </div>
        </div>
        <div class="hidden md:inline-flex flex-row justify-between w-3/4 mx-4 -mt-12 pl-28">
          <div class="inline-flex flex-row">
            <span>法定代表人：</span>
            <span class="text-white">{{ item.corporation }}</span>
          </div>
          <div class="inline-flex flex-row">
            <span>成立日期：</span>
            <span class="text-white">{{ item.foundation_date }}</span>
          </div>
          <div class="inline-flex flex-row">
            <span>邮箱：</span>
            <span class="text-white">{{ item.email }}</span>
          </div>
        </div>
        <div class="hidden md:inline-flex flex-row justify-between w-3/4 mx-4 mt-2 pl-28">
          <div class="inline-flex flex-row">
            <span>电话：</span>
            <div>
              <span class="text-white">{{ encryptPhone(item.contact_phone) }}</span>
              <button v-if="typeof item.contact_phone === 'object' && item.contact_phone instanceof Array && item.contact_phone.length > 1" @click.stop.prevent="showAllPhoneByPc(index)" class="ml-1 font-orange">更多</button>
            </div>
          </div>
          <div class="inline-flex flex-row">
            <span>社会统一信用代码：</span>
            <span class="text-white">{{ item.credit_code }}</span>
          </div>
        </div>
        <!-- 搜索结果项 - 第三行 -->
        <div class="inline-flex w-full md:w-auto text-xs md:text-sm px-4 pt-4 md:pl-28 md:pt-0 mt-4 md:mt-2 md:mx-4 whitespace-nowrap overflow-hidden border-solid">地址：<span class="inline-block w-full text-xs md:text-sm text-white whitespace-nowrap text-ellipsis overflow-hidden">{{ item.address }}</span></div>
        <!-- 搜索结果项 - 第四行 -->
        <div class="inline-flex w-full md:w-auto text-xs md:text-sm px-4 pt-4 md:pl-28 md:pt-0 mt-4 md:mt-2 md:mx-4 whitespace-nowrap overflow-hidden border-solid">经营范围：<span class="inline-block w-full text-xs md:text-sm text-white whitespace-nowrap text-ellipsis overflow-hidden">{{ item.business_scope }}</span></div>
        <div class="absolute">
          <div @click.stop.prevent="hidePhonePopupByPc" :class="'fixed ' + (item.is_show_phone_popup ? 'left-0 top-0 w-full h-full' : 'left-1/2 top-1/2 w-0 h-0') + ' overflow-hidden z-10 cursor-default transition-all'"></div>
          <div @click.stop.prevent="false" :class="'absolute left-32 top-24 inline-flex w-44 ' + (item.is_show_phone_popup ? 'max-h-screen p-2' : 'max-h-0 p-0') + ' bg-white overflow-hidden z-20 rounded-lg shadow shadow-black cursor-default transition-all'">
            <svg @click.stop.prevent="hidePhonePopupByPc" class="absolute right-1 top-1 w-4 h-4" style="color: rgb(153,153,153);cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
            <div class="inline-flex flex-col items-center h-full mt-1">
              <div class="inline-flex justify-start w-full h-full py-1 text-black" v-for="subitem in item.contact_phone">{{ encryptPhone(subitem) }}</div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
  <div class="relative hidden md:inline-flex justify-center items-center w-full text-xs my-5 pagination" :style="'--real-width:'+headerWidth+';'">
    <div class="inline-flex justify-center items-center mr-5 page-button" v-if="currentPage > 1" @click="jumpToPrevPage">上一页</div>
    <template v-if="totalPages <= paginationSize">
      <template v-for="i in totalPages">
        <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === i ? ' selected' : '')" @click="jumpToPage(i)">{{ i }}</div>
      </template>
    </template>
    <template v-else-if="currentPage <= paginationSize - 2 && totalPages >= paginationSize + 2">
      <template v-for=" i in paginationSize - 1">
        <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === i ? ' selected' : '')" @click="jumpToPage(i)">{{ i }}</div>
      </template>
      <div class="inline-flex justify-center items-center mr-5 ellipsis">...</div>
      <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === totalPages ? ' selected' : '')" @click="jumpToPage(totalPages)">{{ totalPages }}</div>
    </template>
    <template v-else-if="currentPage <= paginationSize - 2 && totalPages < paginationSize + 2">
      <template v-for=" i in paginationSize - 1">
        <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === i ? ' selected' : '')" @click="jumpToPage(i)">{{ i }}</div>
      </template>
      <div class="inline-flex justify-center items-center mr-5 ellipsis">...</div>
      <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === totalPages ? ' selected' : '')" @click="jumpToPage(totalPages)">{{ totalPages }}</div>
    </template>
    <template v-else-if="currentPage >= totalPages - paginationSize + 3">
      <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === 1 ? ' selected' : '')" @click="jumpToPage(1)">1</div>
      <div class="inline-flex justify-center items-center mr-5 ellipsis">...</div>
      <template v-for="i in totalPages">
        <div v-if="i >= totalPages - paginationSize + 2" :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === i ? ' selected' : '')" @click="jumpToPage(i)">{{ i }}</div>
      </template>
    </template>
    <template v-else>
      <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === 1 ? ' selected' : '')" @click="jumpToPage(1)">1</div>
      <div class="inline-flex justify-center items-center mr-5 ellipsis">...</div>
      <template v-for="i in currentPage + 1">
        <div v-if="i >= currentPage - 1" :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === i ? ' selected' : '')" @click="jumpToPage(i)">{{ i }}</div>
      </template>
      <div class="inline-flex justify-center items-center mr-5 ellipsis">...</div>
      <div :class="'inline-flex justify-center items-center mr-5 page-button'+(currentPage === totalPages ? ' selected' : '')" @click="jumpToPage(totalPages)">{{ totalPages }}</div>
    </template>
    <div class="inline-flex justify-center items-center mr-5 jump-to">
      <span>跳到</span>
      <input class="w-16 mx-2 text-center" type="text" v-model="inputPage" @keyup.enter="jumpToInputPage" />
      <button @click="jumpToInputPage">确定</button>
    </div>
    <div class="inline-flex justify-center items-center mr-5 page-button" v-if="currentPage < totalPages" @click="jumpToNextPage">下一页</div>
  </div>
  <!-- 电话号码展示弹窗 -->
  <div @click.stop="hidePhonePopup" :class="'fixed ' + (isShowPhonePopup ? 'left-0 top-0' : 'left-1/2 top-1/2') + ' inline-flex justify-center items-center ' + (isShowPhonePopup ? 'w-full h-full' : 'w-0 h-0') + ' bg-black bg-opacity-50 transition-all'">
    <div @click.stop="false" :class="'inline-flex flex-col w-3/4 md:w-1/2 lg:w-1/3 ' + (isShowPhonePopup ? 'max-h-screen' : 'max-h-0') + ' min-h-max px-2 ' + (isShowPhonePopup ? 'py-4' : 'py-0') + ' bg-white text-black rounded-xl overflow-hidden shadow transition-all'">
      <div class="relative inline-flex justify-center items-center text-xl font-bold">
        <div>电话号码</div>
        <svg @click.stop="hidePhonePopup" class="absolute right-0 top-0 w-5 h-5" style="color: rgb(153,153,153);cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>
      </div>
      <div class="inline-flex flex-col items-center h-full mt-2">
        <div class="inline-flex justify-center w-full h-full py-4 border-t border-solid last-of-type:border-b" v-for="item in searchResultList[showPhoneIndex]?.contact_phone">{{ encryptPhone(item) }}</div>
      </div>
    </div>
  </div>
  <!-- 获取定位权限询问弹窗 -->
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
        <div @click.stop="getAreaInfoByIP" class="inline-flex justify-center items-center text-base px-4 py-1 border border-solid border-current rounded cursor-pointer" style="color: #20B16A;">允许</div>
        <div @click.stop="hideAskForGetPositionPopup" class="inline-flex justify-center items-center text-base px-4 py-1 border border-solid border-current rounded cursor-pointer" style="color: #999999;">禁止</div>
      </div>
    </div>
  </div>
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
  background-color: transparent;
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

@media (max-width: 767px) {
  .search_find_num_tips {
    background-color: rgb(18,18,19);
  }
}

.search-list-item {
  background-color: rgb(27,27,27);
}

.zaiye {
  color: rgb(31,167,101);
  border-color: rgb(31,167,101);
}

.select-box-pc {
  background-color: rgb(45,45,45);
}

.select-item-title,
.select-item-title-expand-more-button,
.to-cancel-multi-select-province,
.search-list-item > div:nth-of-type(2) > div > span:nth-of-type(1),
.search-list-item > div:nth-of-type(3),
.search-list-item > div:nth-of-type(4) {
  color: rgb(151,151,151);
}

.search-list-item > div:nth-of-type(3),
.search-list-item > div:nth-of-type(4) {
  border-top-width: 1px;
  border-color: rgb(39,39,39);
}

.font-orange {
  color: rgb(253,148,53);
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
}
</style>