import {
  generateCompanyShortName
} from "../utils/areaUtil"

function shuffle(arr: any[]): (typeof arr) {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    let index = parseInt((Math.random() * (len - i)).toString())
    let temp = arr[index]
    arr[index] = arr[len - i - 1]
    arr[len - i - 1] = temp
  }
  return arr
}

let wordLogoBgColors = [
  '#946148',
  '#A88847',
  '#A88847',
  '#6D9347',
  '#7751A1',
  '#925692',
  '#9A4D4D',
  '#4D739A',
  '#4A9777',
  '#6E5CAC',
]

export default defineEventHandler(async (e) => {
  try {
    // 判断是否有传入query
    let query = getQuery(e)
    if (!query) throw new Error('缺少参数')
    let name = query['name'] as string
    if (!name || typeof name != 'string' || name.trim() == '') throw new Error('缺少参数')
    let formData = new URLSearchParams()
    formData.append('type', '0')
    formData.append('name', name)
    formData.append('address', '')
    formData.append('page', '1')
    formData.append('size', '5')
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
    res.data = res.data.map((item:any, index:number) => {
      if (index % wordLogoBgColors.length === 0) {
        wordLogoBgColors = shuffle(wordLogoBgColors)
      } 
      item.short_name = generateCompanyShortName(item.company_name)
      item.word_logo_bg_color = wordLogoBgColors[index % wordLogoBgColors.length]
      return item
    })
    return {
      code: 200,
      message: res.message,
      result: res.data,
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