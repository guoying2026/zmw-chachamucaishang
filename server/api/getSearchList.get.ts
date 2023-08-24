import {
  generateCompanyShortName
} from "../utils/areaUtil"

export default defineEventHandler(async (e) => {
  try {
    // 判断是否有传入query
    let query = getQuery(e)
    if (!query) throw new Error("缺少参数")
    let count = 0
    let name = ''
    let area = ''
    let page = 1
    let pageSize = 10
    for (let i in query) {
      count++
      if (i == 'name') name = query[i] as string
      if (i == 'area') area = query[i] as string
      if (i == 'page') page = Number(query[i]) as number
      if (i == 'page_size') pageSize = Number(query[i]) as number
    }
    if (count == 0 || name.trim() == '') throw new Error("缺少参数")

    let formData = new URLSearchParams()
    formData.append('type', '0')
    formData.append('name', name)
    formData.append('address', area)
    formData.append('page', page.toString())
    formData.append('size', pageSize.toString())

    // 执行转发接口的请求
    let data = await fetch('https://api.jinrongwan.cn/Pc/Index/getSearchResult', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    let res = await data.json() as {status: number, message: string, data?: any, current_page?: number, page_size?: number, total_page?: number, total_size?: number}
    if (res.status != 1000) throw new Error(res.message)
    res.data = res.data.map((item:any) => {
      item.short_name = generateCompanyShortName(item.company_name)
      return item
    })
    return {
      code: 200,
      message: res.message,
      result: {
        data: res.data,
        current_page: Number(res.current_page),
        page_size: Number(res.page_size),
        total_page: Number(res.total_page),
        total_size: Number(res.total_size),
      },
    }
  } catch (e: any | Error) {
    if (typeof e == 'string') {
      return {
        code: 500,
        message: e,
      }
    }
    if (e instanceof Error) {
      return {
        code: 500,
        message: e.message,
      }
    }
  }
})