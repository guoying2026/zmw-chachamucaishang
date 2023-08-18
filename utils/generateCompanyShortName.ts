import { AreaListItem } from '~/types/areaListItem'

export const generateCompanyShortName = (name: string, areaList: AreaListItem[]): string => {
  const companySuffixes = [
    "企业管理咨询有限责任公司",
    "企业管理咨询责任有限公司",
    "信息科技有限责任公司",
    "信息科技责任有限公司",
    "管理咨询责任有限公司",
    "管理咨询有限责任公司",
    "企业管理咨询有限公司",
    "信息技术有限责任公司",
    "信息技术责任有限公司",
    "劳务派遣服务有限公司",
    "劳务派遣有限责任公司",
    "劳务派遣有限公司",
    "科技股份有限公司",
    "科技有限责任公司",
    "科技责任有限公司",
    "信息科技有限公司",
    "网络科技有限公司",
    "咨询有限责任公司",
    "咨询责任有限公司",
    "管理咨询有限公司",
    "信息技术有限公司",
    "技术有限责任公司",
    "技术责任有限公司",
    "管理有限责任公司",
    "管理责任有限公司",
    "科技服务有限公司",
    "食品发展有限公司",
    "食品集团有限公司",
    "集团股份有限公司",
    "食品有限公司",
    "实业有限公司",
    "集团有限公司",
    "责任有限公司",
    "有限责任公司",
    "股份有限公司",
    "科技有限公司",
    "信息有限公司",
    "咨询有限公司",
    "技术有限公司",
    "管理有限公司",
    "发展有限公司",
    "投资公司",
    "有限公司",
    "集团",
    "木材公司",
    "厂",
    "站",
    "店",
    "部",
    "处",
    "木材厂",
    "木材站",
    '钢材店',
    '木材制材厂',
    '制材厂',
    '木业部',
    "经营部",
    "经销处",
    "购销站",
    "市场",
    '木材',
  ]

  // 省份前缀
  let province: string[] = JSON.parse(JSON.stringify(areaList.map(item => item.name)))
  let provinceSuffixes = ['市', '省', '自治区', '特别行政区', '壮族', '回族', '维吾尔族', '维吾尔']
  province = province.concat(province.map(item => {
    provinceSuffixes.forEach(subitem => {
      if (item.endsWith(subitem)) item = item.substring(0, item.length - subitem.length)
    })
    return item
  }))

  // 地级市前缀
  let city: string[] = []
  areaList.forEach(item => {
    item.childs.forEach(subitem => {
      city.push(subitem.name)
    })
  })
  let citySuffixes = ['高新区', '新区', '区', '市', '盟', '自治州', '地区', '费县', '县']
  city = city.concat(city.map(item => {
    citySuffixes.forEach(subitem => {
      if (subitem.endsWith('行政区划')) return false
      if (item.endsWith(subitem)) item = item.substring(0, item.length - subitem.length)
    })
    return item
  }))

  // 特殊符号
  let symbols = ['（', '(']

  if (!name) return ''

  if (name.length > 4) {
    province.forEach(prefix => {
      // 以 ***省 开头
      if (name.length > 4 && name.startsWith(prefix)) name = name.substring(prefix.length)
    })

    city.forEach(prefix => {
      // 以 ***市 开头
      if (name.length > 4 && name.startsWith(prefix)) name = name.substring(prefix.length)
    })

    // 处理结尾前缀，例如：有限公司
    companySuffixes.forEach(prefix => {
      if (name.length > 4 && name.startsWith(prefix)) name = name.substring(prefix.length)
    })

    companySuffixes.forEach(contain => {
      if (name.length > 4 && name.includes(contain) && !name.endsWith(contain)) name = name.replace(contain, '')
    })

    // 处理结尾后缀，例如：有限公司
    companySuffixes.forEach(suffix => {
      if (name.length > 4 && name.endsWith(suffix)) name = name.substring(0, name.length - suffix.length)
    })

    // 处理特殊符号
    symbols.forEach(symbol => {
      if (name.includes(symbol)){
        let arr = name.split(symbol)
        arr = arr.filter(Boolean)
        name = arr[0]
      }
    })

    provinceSuffixes.forEach(contain => {
      if (name.length > contain.length && name.includes(contain)) name = name.replace(contain, '')
    })

    citySuffixes.forEach(contain => {
      if (name.length > contain.length && name.includes(contain)) name = name.replace(contain, '')
    })

    name = name.substring(0, 4)
  }

  companySuffixes.forEach(item => {
    if (name == item || name.includes("\n")) return false
    if (name.endsWith(item)) {
      name = name.substring(0, name.length - item.length) + "\n" + item
      return false
    }
    if (name.startsWith(item)) {
      name = item + "\n" + name.substring(item.length)
      return false
    }
  })

  // 如果是四个字，并且在第一个字或第三个字之后换行的，重新换行
  if (name.replace("\n","").length == 4 && (name.indexOf("\n") == 1 || name.indexOf("\n") == 3)) {
    name = name.replace("\n", "")
  }

  // 如果大于两个字并且没有换行，在第二个字后面换行
  if (name.length > 2 && !name.includes("\n")) {
    name = name.substring(0,2) + "\n" + name.substring(2)
  }

  return name
}