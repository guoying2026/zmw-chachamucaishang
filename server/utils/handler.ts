/**
 * 加密手机号码
 * @param {string | number | string[]} phone
 */
export const encryptPhone = (phone: string | number | string[]) => {
  if (!phone) {
    return ''
  }
  if (typeof phone === 'object' && phone instanceof Array) {
    phone = phone[0];
  }
  if (typeof phone === 'number') {
    phone = phone.toString();
  }
  let isEncrypted = false
  if (!isEncrypted && /^(\d{3})\d{4}(\d{4})$/.test(phone)) {
    phone = phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1********');
    isEncrypted = true
  }
  if (!isEncrypted && /^(\d{3,4})-{0,1}(\d{1,})$/.test(phone)) {
    let execRet = /^(\d{3,4})(-{0,1})(\d{1,})$/.exec(phone)
    if (execRet) {
      phone = phone.replace(/^(\d{3,4})-{0,1}(\d{1,})$/, '$1'.padEnd(execRet[2].length + execRet[3].length + 2, '*'))
      isEncrypted = true
    }
  }
  if (!isEncrypted) {
    let execRet = /(\S{3})(\S{0,})/.exec(phone)
    if (execRet) {
      phone = phone.replace(/(\S{3})(\S{0,})/, '$1'.padEnd(execRet[2].length + 2, '*'))
      isEncrypted = true
    }
  }
  return phone;
}