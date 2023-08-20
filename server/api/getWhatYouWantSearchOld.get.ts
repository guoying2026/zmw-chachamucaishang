/* 
  ●原木、锯材、木制品
  ●木材+
    木材仓储、木材加工、木材研发、木材检测、木材及制品、木材销售、木材组件加工、木材收购、木材采运、木材经营、木材下角料、
  ●木皮+
    木皮加工、木皮染色、木皮生产、装饰木皮（又称薄木贴面板）、
  ●木质+
    木质容器、木质型材、木质片材、木质板材、木质胶合板、木质包装箱
  ●木塑+
    木塑复合材料
    建筑用木料、木托盘、木柱、木梁、木条、木桩、木板、木方、科技木、实木、原木、木片、
  ●刨花墩
  ●板+
    板材、板皮、单板、单层板、多层板、贴面板、人造板、建筑模板、
    单板层积材（单板层积材的生产工艺过程与胶合板生产过程大体相同，层积材和胶合板最大的区别是单板的排布组坯，单板层积材由单板层积组胚胶合而成，是替代锯材为目标而加工的产品，节选自《机电产品木包装系统设计》）、
    木工板、
    木芯板（室内装饰书籍说：大芯板，也可以叫做细木工板）、
    生态板、
    指接板（室内装饰书籍说：也可以叫做机拼实木板）、
    胶合板（室内装饰书籍说：也可以叫夹板）、
    薄木贴面板（室内装饰书籍说：也可以叫装饰木皮，它是胶合板的一种，一般分为天然板与科技板两种。）
    纤维板（也可以叫密度板）【拓展品种有装饰纤维板、波纹板、吸声板、刨花板（室内装饰书籍说：也可以叫微粒板，也可以叫庶渣板，也有进口高档产品称为定向刨花板、欧松板）】、
    木地板（分类有实木地板【国产阔叶材地板、国产针叶材地板、进口材地板】，实木复合木地板）
  ●材+
    集成材、板材、锯材 */
const originArr = [
  '原木', '锯材', '木制品',
  '木材仓储', '木材加工', '木材研发', '木材检测', '木材及制品', '木材销售', '木材组件加工', '木材收购', '木材采运', '木材经营', '木材下角料',
  '木皮加工', '木皮染色', '木皮生产', '装饰木皮', '薄木贴面板',
  '木质容器', '木质型材', '木质片材', '木质板材', '木质胶合板', '木质包装箱',
  '木塑复合材料',
  '建筑用木料', '木托盘', '木柱', '木梁', '木条', '木桩', '木板', '木方', '科技木', '实木', '原木', '木片',
  '刨花墩',
  '板材', '板皮', '单板', '单层板', '多层板', '贴面板', '人造板', '建筑模板',
  '单板层积材',
  '木工板',
  '木芯板', '大芯板', '细木工板',
  '生态板',
  '指接板', '机拼实木板',
  '胶合板', '夹板',
  '薄木贴面板', '装饰木皮', '天然板', '科技板',
  '纤维板', '密度板', '装饰纤维板', '波纹板', '吸声板', '刨花板', '微粒板', '庶渣板', '定向刨花板', '欧松板',
  '木地板', '实木地板', '国产阔叶材地板', '国产针叶材地板', '进口材地板', '实木复合木地板',
  '集成材', '板材', '锯材',
]

const uniqueArr = [...new Set(originArr)]

const size = 4

const getListByRandom = (arr: any[], size: number, excludes?: (typeof arr)) => {
  let ret = [] as (typeof arr)
  for (let i = 0; i < size; i++) {
    let index = Math.floor(Math.random() * arr.length)
    let item = arr[index]
    if (ret.includes(item) || (excludes && excludes.length > 0 && excludes.includes(item))) {
      i--
      continue
    }
    ret.push(item)
  }
  return ret
}

const queryValue2Arr = (queryValue: string, separator?: string) => {
  if (!separator || separator.length == 0) separator = ' '
  return queryValue.trim().replaceAll(separator + separator, separator).split(separator)
}

const shuffle = (arr: any[]) => {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    let index = parseInt((Math.random() * (len - i)).toString())
    let temp = arr[index]
    arr[index] = arr[len - i - 1]
    arr[len - i - 1] = temp
  }
  return arr
}

export default defineEventHandler(async (e) => {
  try {
    let query = getQuery(e)
    if (!query) throw new Error("缺少参数")

    let name = (query.name ? query.name : '') as string

    let nameArr = queryValue2Arr(name)

    // 如果没有传入name参数，则随机取4个，并且不重复
    if (!name || typeof name != 'string' || name.trim().length == 0 || nameArr.length == 0) {
      return {
        page: 1,
        total_page: 1,
        offset: 0,
        data: getListByRandom(uniqueArr, size)
      }
    }

    // 定义页码
    let page = 1
    if (query.page && !isNaN(Number(query.page))) page = Number(query.page) as number

    // 偏移量，有可能最后一页的数量不够，则需要向第一页借取凑数，之后再回到第一页则必须得从+offset开始
    let offset = 0
    if (query.offset && !isNaN(Number(query.offset))) offset = Number(query.offset) as number

    let ret = [] as string[]

    // 搜索并添加能够匹配到的关键词
    nameArr.forEach(name => {
      uniqueArr.forEach((item: string) => {
        // 已经添加过的就不再重复添加
        if (ret.includes(item)) return false
        // 匹配的要求是任意一方包含了另一方
        if (!item.includes(name) && !name.includes(item)) return false
        ret.push(item)
      })
    })

    // 根据页码和偏移量提取
    let ret1 = ret.slice(((page - 1) * size) + offset, (page * size) + offset)

    // 如果当前页不够数量，则向第一页提取
    if (ret1.length < size) {
      offset = size - ret1.length
      let temp = ret
        .filter(item => !ret1.includes(item)) // 这里使不再提取当前列表里的重复项
        .slice(0, offset)
      ret1 = ret1.concat(temp)
    }

    // 如果搜索词匹配不到关键词，则随机给出
    if (ret1.length == 0) ret1 = getListByRandom(uniqueArr, size)

    // 如果匹配到的数量不够数，则随机抽取到指定个数
    if (ret1.length < size) {
      let temp =getListByRandom(uniqueArr, size - ret1.length, ret1)
      ret1 = ret1.concat(temp)
    }

    // 随机打乱顺序
    ret1 = shuffle(ret1)

    let totalPage = Math.round(ret.length / size)

    return {
      page: page,
      total_page: totalPage,
      offset: offset,
      data: ret1,
    }
  } catch (e) {
    return {
      page: 1,
      total_page: 1,
      offset: 0,
      data: []
    }
  }
})