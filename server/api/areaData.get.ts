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
    provincesArr[i].is_selected = false
    provincesArr[i].is_show = true
    if ([11,12,31,50].includes(code)) {
      provincesArr[i].childs = res1.map((item:any) => {
        return item.childs.map((subitem:any) => {
          delete subitem.childs
          subitem.is_selected = false
          subitem.is_show = true
          return subitem
        })
      }).flat(1)
    } else {
      provincesArr[i].childs = res1.map((item:any) => {
        delete item.childs
        item.is_selected = false
        item.is_show = true
        return item
      })
    }
  })
}
const areaData = {code: 200, message: '请求成功', result: provincesArr}

export default defineEventHandler (() => areaData)