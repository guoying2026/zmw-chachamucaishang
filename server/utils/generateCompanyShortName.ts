import * as fs from 'node:fs'

import * as process from 'node:process'

const provinces = fs.readFileSync(process.cwd() + '/server/data/province.json', {
  encoding: 'utf-8',
})

const provincesArr = JSON.parse(provinces) as {code:number,name:string,childs?:any[]}[]

let loadedCount = 0
let areaList = [] as any[]
provincesArr.forEach((province, index) => {
  let code = province.code
  let url = process.cwd() + '/server/data/province_' + code + '.json'
  fs.readFile(url, {
    encoding: 'utf-8',
  }, (err, res) => {
    let res1 = JSON.parse(res)
    provincesArr[index].childs = res1
    if (++loadedCount != provincesArr.length) return false
    areaList = provincesArr
  })
})

export const generateCompanyShortName = (name: string): string => {
  const nations = ['壮族', '藏族', '裕固族', '彝族', '瑶族', '锡伯族', '乌孜别克族', '维吾尔族', '佤族', '土家族', '土族', '塔塔尔族', '塔吉克族', '水族', '畲族', '撒拉族', '羌族', '普米族', '怒族', '纳西族', '仫佬族', '苗族', '蒙古族', '门巴族', '毛南族', '满族', '珞巴族', '僳僳族', '黎族', '拉祜族', '柯尔克孜族', '景颇族', '京族', '基诺族', '回族', '赫哲族', '哈萨克族', '哈尼族', '仡佬族', '高山族', '鄂温克族', '俄罗斯族', '鄂伦春族', '独龙族', '东乡族', '侗族', '德昂族', '傣族', '达斡尔族', '朝鲜族', '布依族', '布朗族', '保安族', '白族', '阿昌族', '汉族']
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
    "木材制材厂",
    "木板皮厂",
    "旋木皮厂",
    "木材公司",
    "建筑模板",
    "木材厂",
    "木材站",
    "钢材店",
    "制材厂",
    "加工厂",
    "旋皮厂",
    "加工场",
    "加工处",
    "加工店",
    "加工部",
    "木业部",
    "经营部",
    "门市部",
    "总公司",
    "分公司",
    "经销处",
    "购销站",
    "收购站",
    "木板皮",
    "干木皮",
    "湿木皮",
    "旋木皮",
    "人造板",
    "指接板",
    "胶合板",
    "包装箱",
    "市场",
    "商店",
    "收购",
    "商行",
    "加工",
    "工业",
    "公司",
    "建材",
    "木材",
    "木屑",
    "木片",
    "木料",
    "木皮",
    "木方",
    "木板",
    "长条",
    "托盘",
    "木箱",
    "长料",
    "短料",
    "脚墩",
    "实木",
    "杂木",
    "木箱",
    "贴面",
    "刨花",
    "厂",
    "站",
    "店",
    "部",
    "处",
  ]

  // 省份前缀
  let province: string[] = JSON.parse(JSON.stringify(areaList.map(item => item.name)))
  let provinceSuffixes = ['市', '省', '自治区', '特别行政区', '维吾尔']
  provinceSuffixes = provinceSuffixes.concat(nations)
  province = province.concat(province.map(item => {
    provinceSuffixes.forEach(subitem => {
      if (item.length - subitem.length <= 1) return false
      if (item.endsWith(subitem)) item = item.substring(0, item.length - subitem.length)
    })
    return item
  }))

  // 地级市前缀
  let city: string[] = []
  areaList.forEach((item: any) => {
    if (!item || !item.childs) return false
    item.childs.forEach((subitem:any) => {
      if (!subitem || !subitem.name) return false
      city.push(subitem.name)
    })
  })
  let citySuffixes = ['高新区', '新区', '区', '市', '盟', '自治州', '地区', '县']
  citySuffixes = citySuffixes.concat(nations)
  city = city.concat(city.map(item => {
    citySuffixes.forEach(subitem => {
      if (subitem.endsWith('行政区划')) return false
      if (item.length - subitem.length <= 1) return false
      if (item.endsWith(subitem)) item = item.substring(0, item.length - subitem.length)
    })
    return item
  }))

  // 区县前缀
  let county: string[] = []
  areaList.forEach((item: any) => {
    if (!item || !item.childs) return false
    item.childs.forEach((item1:any) => {
      if (!item1 || !item1.childs) return false
      item1.childs.forEach((item2: any) => {
        if (!item2 || !item2.name) return false
        county.push(item2.name)
      })
    })
  })
  let countySuffixes = ['转型综合改革示范区', '高新技术产业开发区', '旅游度假区', '飞地经济区', '循环化工园区', '专利技术园区', '经济开发区', '风景名胜区', '工业园区', '果树农场', '管理区', '管委会', '市辖区', '高新区', '经济区', '自治县', '自治旗', '农场', '矿区', '新区', '新城', '左旗', '中旗', '右旗', '前旗', '后旗', '左翼', '中翼', '右翼', '前翼', '后翼', '街道', '区', '县', '市', '旗', '镇', '乡']
  countySuffixes = countySuffixes.concat(nations)
  county = county.concat(county.map(item => {
    countySuffixes.forEach(subitem => {
      if (item.length - subitem.length <= 1) return false
      if (item.endsWith(subitem)) item = item.substring(0, item.length - subitem.length)
    })
    return item
  }))

  // 乡镇前缀
  let town: string[] = []
  areaList.forEach((item: any) => {
    if (!item || !item.childs) return false
    item.childs.forEach((item1: any) => {
      if (!item1 || !item1.childs) return false
      item1.childs.forEach((item2: any) => {
        if (!item2 || !item2.childs) return false
        item2.childs.forEach((item3: any) => {
          if (!item3 || !item3.name) return false
          county.push(item3.name)
        })
      })
    })
  })
  let townSuffixes = ['地区', '街道', '乡', '镇', '区', '管理委员会']
  townSuffixes = townSuffixes.concat(nations)
  town = town.concat(town.map(item => {
    townSuffixes.forEach(subitem => {
      if (item.length - subitem.length <= 1) return false
      if (item.endsWith(subitem)) item = item.substring(0, item.length - subitem.length)
    })
    return item
  }))

  // 特殊符号
  let symbols = ['（', '(']

  let nameMinLength = 3

  if (!name) return ''

  if (name.length > nameMinLength) {
    province.forEach(prefix => {
      // 以 ***省 开头
      if (name.length > nameMinLength && name.startsWith(prefix) && name.substring(prefix.length).length > 0) name = name.substring(prefix.length)
    })

    city.forEach(prefix => {
      // 以 ***市 开头
      if (name.length > nameMinLength && name.startsWith(prefix) && name.substring(prefix.length).length > 0) name = name.substring(prefix.length)
    })

    county.forEach(prefix => {
      // 以 ***区/县 开头
      if (name.length > nameMinLength && name.startsWith(prefix) && name.substring(prefix.length).length > 0) name = name.substring(prefix.length)
    })

    town.forEach(prefix => {
      // 以 ***镇/街道 开头
      if (name.length > nameMinLength && name.startsWith(prefix) && name.substring(prefix.length).length > 0) name = name.substring(prefix.length)
    })

    // 处理结尾前缀，例如：有限公司
    companySuffixes.forEach(prefix => {
      if (name.length > nameMinLength && name.startsWith(prefix) && name.substring(prefix.length).length > 0) name = name.substring(prefix.length)
    })

    companySuffixes.forEach(contain => {
      if (name.length > nameMinLength && name.includes(contain) && !name.endsWith(contain) && name.replace(contain, '').length > 0) name = name.replace(contain, '')
    })

    // 处理结尾后缀，例如：有限公司
    companySuffixes.forEach(suffix => {
      if (name.length > nameMinLength && name.endsWith(suffix) && name.substring(0, name.length - suffix.length).length > 0) name = name.substring(0, name.length - suffix.length)
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
      if (name.length > contain.length && name.includes(contain) && name.replace(contain, '').length > 0) name = name.replace(contain, '')
    })

    citySuffixes.forEach(contain => {
      if (name.length > contain.length && name.includes(contain) && name.replace(contain, '').length > 0) name = name.replace(contain, '')
    })

    name = name.substring(0, 4)
  }

  companySuffixes.forEach(item => {
    if (name == item || name.includes("\n") || name.length <= 2) return false
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