export default defineEventHandler (async (e) => {
  return {
    code: 200, 
    message: '请求成功', 
    result: e.node.req.headers['x-forwarded-for'] // 判断是否有反向代理 IP
    || e.node.req.connection.remoteAddress // 判断 connection 的远程 IP
    || e.node.req.socket.remoteAddress // 判断后端的 socket 的 IP
  };
  const key = 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77';
  // const key = '74XBZ-WJZCL-LMYP7-MYFWR-Z5E56-YDF2U';
  const body = await e.fetch('https://apis.map.qq.com/ws/location/v1/ip?key=' + key, {
    // headers: {
    //   "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    //   "accept-language": "zh-CN,zh-TW;q=0.9,zh-HK;q=0.8,zh;q=0.7,en-US;q=0.6,en;q=0.5,zh-MO;q=0.4,en-GB;q=0.3",
    //   "cache-control": "max-age=0",
    //   "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
    //   "sec-ch-ua-mobile": "?0",
    //   "sec-ch-ua-platform": "\"Windows\"",
    //   "sec-fetch-dest": "document",
    //   "sec-fetch-mode": "navigate",
    //   "sec-fetch-site": "same-site",
    //   "sec-fetch-user": "?1",
    //   "upgrade-insecure-requests": "1"
    // },
    // referrer: "https://lbs.qq.com/",
    // referrerPolicy: "strict-origin-when-cross-origin",
    // body: null,
    // method: 'GET',
    // mode: 'cors',
    // credentials: 'include',
  }).then(res => res.json()).then(res => {
    e.node.res.end({code: 200, message: '请求成功', result: res})
  })
  return { body }
})