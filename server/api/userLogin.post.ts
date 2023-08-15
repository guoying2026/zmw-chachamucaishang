export default defineEventHandler(async (e) => {
  try {
    // 判断是否有传入body
    let body = await readRawBody(e)
    if (!body) throw new Error("缺少参数")

    // 解析body内容
    let reqData = JSON.parse(body) as {phone: any, code: any}
    if (!reqData.hasOwnProperty('phone')) throw new Error("缺少参数")
    if (!reqData.hasOwnProperty('code')) throw new Error("缺少参数")
    if (typeof reqData.phone != 'string') throw new Error("缺少参数")
    if (typeof reqData.code != 'string') throw new Error("缺少参数")
    if (reqData.phone.trim().length == 0) throw new Error("缺少参数")
    if (reqData.code.trim().length == 0) throw new Error("缺少参数")

    // 获取phone参数的值
    let phone = reqData.phone.trim()

    // 获取code参数的值
    let code = reqData.code.trim()

    // 过滤掉手机号码的非数字字符
    phone = phone.replaceAll(/[^\d]/g, '')

    // 判断是否为手机号码
    let regExp = /1\d{10}/
    if (!regExp.test(phone)) throw new Error("请输入正确的手机号")

    // 有可能匹配出来的手机号码格式是86 *** **** ****，需要把86去掉
    let execRes = regExp.exec(phone)
    if (!execRes) throw new Error("请输入正确的手机号")
    let realPhoneNumber = execRes[0]

    // 把手机号码和验证码加入到FormData,并转发到实际的接口
    let formData = new URLSearchParams()
    formData.append('username', realPhoneNumber)
    formData.append('is_sms', '1')
    formData.append('usercode', code)
    formData.append('distinct_id', '0')
    formData.append('cap_id', '9')
    formData.append('openid', '')
    formData.append('province', '')
    formData.append('is_driver', '0')
    formData.append('weixin_login', '0')//不计算weixin登录
    formData.append('click_index', '0')

    // 执行发送到转发接口的请求
    let data = await fetch((process.env.NODE_ENV == 'production' ? 'https://api.jinrongwan.cn/' : 'https://zmwapi.jinrongwan.cn/') + 'Pc/User/login', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    let res = await data.json() as {status: number, info?: string, message?: string, data?: any}
    if (res.status != 1000) {
      if (res.hasOwnProperty('info') && res.info && typeof res.info == 'string') {
        throw new Error(res.info);
      }
      if (res.hasOwnProperty('message') && res.message && typeof res.message == 'string') {
        throw new Error(res.message);
      }
    }
    return {
      code: 200,
      message: '登录成功',
      result: res.data ? res.data : null,
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