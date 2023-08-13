import Searcher from './ip2region.class'
import { AreaListItem } from '../../types/areaListItem';

// 下载地址：https://gitee.com/lionsoul/ip2region/raw/master/data/ip2region.xdb
const searcher = Searcher.newWithFileOnly('server/data/ip2region.xdb')

export default defineEventHandler (async (e) => {
  let ip = ''
  if (e.node.req.url) {
    let res: { [key: string]: any } = {};
    e.node.req.url
    .substring(e.node.req.url.indexOf('?') + 1)
    .split('&')
    .map(item => {
      let key = item.substring(0, item.indexOf('='))
      let value = item.substring(item.indexOf('=') + 1)
      res[key] = value
    })
    if (res.ip) ip = res.ip as string
  }
  if (ip.trim() == '') {
    ip = e.node.req.headers['x-forwarded-for'] as string // 判断是否有反向代理 IP
    || e.node.req.connection.remoteAddress as string // 判断 connection 的远程 IP
    || e.node.req.socket.remoteAddress as string // 判断后端的 socket 的 IP
  }
  return new Promise(resolve => {
    searcher.search(ip).then((res: any) => {
      let region: string = res.region as string
      let regionArr: string[] = region.split('|')
      let country: string = regionArr[0] as string
      let province: string = regionArr[2] as string
      let city: string = regionArr[3] as string
      e.fetch('/api/areaData')
      .then(r => r.json())
      .then((r: {code: number, message: string, result: AreaListItem[]}) => {
        let provinceCode = "0"
        let cityCode = "0"
        let adcode = "0"
        let filterProvince = r.result.filter(item => item.name == province || item.name.includes(province))
        if (filterProvince.length > 0) {
          provinceCode = filterProvince[0].code.toString()
          adcode = provinceCode.padEnd(6, '0')
          let filterCity = filterProvince[0].childs.filter(item => item.name == city || item.name.includes(city))
          if (filterCity.length > 0) {
            cityCode = filterCity[0].code.toString()
            adcode = cityCode.padEnd(6, '0')
          }
        }
        adcode = adcode.padEnd(6, '0')
        resolve({code: 200, message: '请求成功', result: {
          origin:  res,
          country: country,
          province: province,
          city: city,
          province_code: provinceCode,
          city_code: cityCode,
          adcode: adcode,
        }})
      }).catch(e => {
        resolve({code: 200, message: '请求成功', result: {
          country: country,
          province: province,
          city: city,
        }})
      })
    }).catch((err: any) => {
      resolve(err)
    })
  })
  return 'error'
})