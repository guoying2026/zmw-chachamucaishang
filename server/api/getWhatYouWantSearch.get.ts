import * as fs from 'node:fs'

import * as path from 'node:path'

import treeTool from 'tree-tool'

import { Category } from '~/types/category'

let category = [] as Category[]

// 每次查找时，最终返回的条数
const size = 4

// 不作为返回结果的名称
const notAddedKeyword = ['其他品类']

// 默认的搜索内容
const defaultSearchKeyword = '木材'

/** 
 * 把字符串分割为数组
 */ 
const str2Arr = (queryValue: string, separator?: string): string[] => {
  if (!separator || separator.length == 0) separator = ' '
  return queryValue.trim().replaceAll(separator + separator, separator).split(separator)
}

/**
 * 给分类标注上标识(id、parentId)
 */
const makeIdAndPId = (arr: Category[], pId?: string): Category[] => {
  arr = arr.map((item, index) => {
    let currentId: string = (index + 1).toString()

    if (pId) {
      item.parentId = pId
      currentId = pId + '-' + (index + 1).toString()
    }

    item.id = currentId

    if (item.childs) item.childs = makeIdAndPId(item.childs, currentId)

    return item
  })

  return arr
}

/**
 * 搜索函数，返回符合搜索要求的字符串数组
 */
const search = (name: string): string[] => {
  let ret = [] as string[]

  let instance = treeTool.createInstance({
    pid: 'parentId',
    children: 'childs',
  })

  // 如果当前的搜索词为空白，则返回顶级分类
  if (name.trim() == '') name = defaultSearchKeyword

  // 查找“当前搜索词”所在的节点
  let allNodes = instance.findNodeAll(category, (node: Category) => node.name.includes(name) || name.includes(node.name)) as Category[]

  // 如果有该节点为别名节点，则查找“父节点”和“同为别名的兄弟节点”
  allNodes.forEach(item => {
    if (!item.isAlias) return false

    // 获取该节点的父节点
    let pNode = instance.findNode(category, (node: Category) => node.id == item.parentId) as Category

    // 把父节点加入到返回结果中
    if (!notAddedKeyword.includes(pNode.name)) {
      ret.push(pNode.name)
    }

    if (!pNode.childs) return false

    // 如果父节点有别名节点，则把别名节点也加入到返回结果中
    pNode.childs.forEach(subitem => {
      if (notAddedKeyword.includes(subitem.name)) {
        if (!subitem.childs) return false
        subitem.childs.forEach(subitem1 => {
          if (subitem1.isAlias) ret.push(subitem1.name)
        })
      }

      if (subitem.isAlias) ret.push(subitem.name)
    })
  })

  // 如果有子节点，则查找子节点
  allNodes.forEach(item => {
    if (!item.childs) return false

    item.childs.forEach(subitem => {
      // 过滤掉无意义分类
      if (notAddedKeyword.includes(subitem.name)) {
        if (!subitem.childs) return false
        subitem.childs.forEach(subitem1 => {
          ret.push(subitem1.name)
        })
        return false
      }

      ret.push(subitem.name)
    })
  })

  // 数组去重
  ret = [...new Set(ret)]

  // 如果返回的内容空白，则直接搜索顶级分类
  if (ret.length == 0) ret = search(defaultSearchKeyword)

  return ret
}

/**
 * 打乱数组的排序
 */
const shuffle = (arr: any[]): (typeof arr) => {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    let index = parseInt((Math.random() * (len - i)).toString())
    let temp = arr[index]
    arr[index] = arr[len - i - 1]
    arr[len - i - 1] = temp
  }
  return arr
}

// 读取分类文件，并赋值到变量
fs.readFile(path.normalize(process.cwd() + '/server/data/category.json'),{
  encoding: 'utf-8'
},(err, res) => {
  if (err) return false

  // 过滤掉空白字符
  res = res.replaceAll(/\s/g, '')

  // 转换为json
  category = JSON.parse(res)

  // 添加上标识
  category = makeIdAndPId(category)
})

export default defineEventHandler(async (e) => {
  try {
    let query = getQuery(e)
    if (!query) throw new Error("缺少参数")

    // 定义页码
    let page = 1
    if (query.page && !isNaN(Number(query.page))) page = Number(query.page) as number

    // 偏移量，有可能最后一页的数量不够，则需要向第一页借取凑数，之后再回到第一页则必须得从+offset开始
    let offset = 0
    if (query.offset && !isNaN(Number(query.offset))) offset = Number(query.offset) as number

    let name = (query.name ? query.name : '') as string

    let nameArr = str2Arr(name)

    let ret = [] as string[]

    // 搜索并添加能够匹配到的关键词
    nameArr.forEach(name => {
      let filteredArr = search(name)
      ret = ret.concat(filteredArr)
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
    if (ret1.length == 0) ret1 = shuffle(search(defaultSearchKeyword)).splice(0, size)

    // 如果匹配到的数量不够数，则随机抽取到指定个数
    if (ret1.length < size) {
      let temp = shuffle(search(defaultSearchKeyword))
      temp = temp.filter(item => !ret1.includes(item)).splice(0, size - ret1.length)
      ret1 = ret1.concat(temp)
    }

    // 随机打乱顺序
    ret1 = shuffle(ret1)

    let totalPage = Math.round(ret.length / size)

    return {
      page: page,
      total_page: totalPage,
      offset: offset,
      key: name,
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