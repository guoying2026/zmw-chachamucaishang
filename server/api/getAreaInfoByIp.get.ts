const baiduAK = 'Cl07wZmoUUkucWnl3xeXO2YA98X4OB9R';
const tencentMapKey = 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77';

import geoip from 'geoip-lite'

export default defineEventHandler (async (e) => {
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

    geoip.reloadDataSync()

    return geoip.lookup(res.ip)
    
    // return new Promise(resolve => {
      /* e.fetch('https://apis.map.qq.com/ws/location/v1/ip?ip=' + res.ip + '&key=' + tencentMapKey)
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => resolve(err)) */
      /* e.fetch('https://api.map.baidu.com/location/ip?ip=' + res.ip + '&coor=bd09ll&ak=' + baiduAK)
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => resolve(err)) */
    // })
  }
  return 'error'
})