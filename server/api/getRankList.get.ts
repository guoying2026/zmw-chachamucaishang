export default defineEventHandler(async (e) => {
  try {
    // 判断是否有传入query
    let query = getQuery(e)
    if (!query) throw new Error("缺少参数")
    let page = 1
    let pageSize = 20 
    let order = 'score_desc'
    for (let i in query) {
      if (i == 'page') page = Number(query[i]) as number
      if (i == 'size') pageSize = Number(query[i]) as number
      if (i == 'order') order = query[i] as string
    }

    let formData = new URLSearchParams()
    formData.append('page', page.toString())
    formData.append('page_size', pageSize.toString())
    formData.append('order', order)

    let data = await fetch('https://api.jinrongwan.cn/Pc/Index/getRankingList', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    let res = await data.json() as {status: number, message: string, data?: {data: any[], total_count: number, total_page: number, current_page: number, page_size: number}}
    if (res.status != 1000) throw new Error(res.message)
    if (res.data) res.data.data = res.data.data.map(item => {
      item.short_name = generateCompanyShortName(item.company_name)
      return item
    })
    return {
      code: 200,
      message: res.message,
      result: {
        data: res.data?.data,
        total_size: res.data?.total_count,
        total_page: res.data?.total_page,
        current_page: res.data?.current_page,
        page_size: res.data?.page_size,
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