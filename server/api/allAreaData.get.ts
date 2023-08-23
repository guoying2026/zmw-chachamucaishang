import * as fs from 'node:fs'

const provincesStr = fs.readFileSync(process.cwd() + '/server/data/province.json', {
  encoding: 'utf-8',
}).toString()

const provincesArr = JSON.parse(provincesStr)

for (let i = 0; i < provincesArr.length; i++) {
  let province = provincesArr[i];
  let code = province.code as number
  let url = process.cwd() + '/server/data/province_' + code + '.json'
  fs.readFile(url,  {
    encoding: 'utf-8',
  }, (err, res) => {
    let res1 = JSON.parse(res)
    provincesArr[i].childs = res1
  })
}
const areaData = {code: 200, message: '请求成功', result: provincesArr}

export default defineEventHandler (() => areaData)