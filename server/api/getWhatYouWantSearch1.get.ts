import * as fs from 'node:fs'

import * as path from 'node:path'

import treeTool from 'tree-tool'

import { Category } from '~/types/category'

let category = [] as Category[]

// 每次查找时，最终返回的条数
const size = 4

// 把字符串分割为数组
const str2Arr = (queryValue: string, separator?: string): string[] => {
  if (!separator || separator.length == 0) separator = ' '
  return queryValue.trim().replaceAll(separator + separator, separator).split(separator)
}

// 给分类标注上标识(id、parentId)
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

// 搜索函数，返回符合搜索要求的字符串数组
const search = (name: string): string[] => {
  let ret = [] as string[]

  let instance = treeTool.createInstance({
    pid: 'parentId',
    children: 'childs',
  })

  // 查找“当前搜索词”所在的节点
  let allNodes = instance.findNodeAll(category, (node: Category) => node.name == name) as Category[]

  // 如果有该节点为别名节点，则查找“父节点”和“同为别名的兄弟节点”
  allNodes.forEach(item => {
    if (!item.isAlias) return false

    // 获取该节点的父节点
    let pNode = instance.findNode(category, (node: Category) => node.id == item.parentId) as Category

    // 把父节点加入到返回结果中
    ret.push(pNode.name)

    if (!pNode.childs) return false

    // 如果父节点有别名节点，则把别名节点也加入到返回结果中
    pNode.childs.forEach(subitem => {
      if (subitem.isAlias) ret.push(subitem.name)
    })
  })

  // 如果有子节点，则查找子节点
  allNodes.forEach(item => {
    if (!item.childs) return false

    item.childs.forEach(subitem => {
      ret.push(subitem.name)
    })
  })

  // 数组去重
  ret = [...new Set(ret)]

  // 过滤掉不展示的内容
  ret = ret.filter(item => !['其他品类'].includes(item))

  return ret
}

export default defineEventHandler(async (e) => {
  try {
    let query = getQuery(e)
    if (!query) throw new Error("缺少参数")

    let name = (query.name ? query.name : '') as string

    let nameArr = str2Arr(name)

    let ret = [] as string[]
    nameArr.forEach(name => {
      let filteredArr = search(name)
      ret = ret.concat(filteredArr)
    })

    return {
      page: 1,
      total_page: 1,
      offset: 0,
      key: name,
      data: ret,
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