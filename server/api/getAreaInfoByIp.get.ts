import geoip from 'fast-geoip'

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
    return geoip.lookup(res.ip)
  }
  return 'error'
})