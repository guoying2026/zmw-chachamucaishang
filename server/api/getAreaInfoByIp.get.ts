import { AreaListItem } from '../../types/areaListItem';

import * as fs from 'node:fs'

const VectorIndexSize = 8
const VectorIndexCols = 256
const VectorIndexLength = 256 * 256 * (4 + 4)
const SegmentIndexSize = 14
const IP_REGEX = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/

const getStartEndPtr = Symbol('#getStartEndPtr')
const getBuffer = Symbol('#getBuffer')
const openFilePromise = Symbol('#openFilePromise')

class Searcher {
  _dbFile: any
  _vectorIndex: any
  _buffer: any
  constructor (dbFile:any, vectorIndex:any, buffer:any) {
    this._dbFile = dbFile
    this._vectorIndex = vectorIndex
    this._buffer = buffer

    if (this._buffer) {
      this._vectorIndex = this._buffer.subarray(256, 256 + VectorIndexLength)
    }
  }

  async [getStartEndPtr] (idx:any, fd:any, ioStatus:any) {
    if (this._vectorIndex) {
      const sPtr = this._vectorIndex.readUInt32LE(idx)
      const ePtr = this._vectorIndex.readUInt32LE(idx + 4)
      return { sPtr, ePtr }
    } else {
      const buf = await this[getBuffer](256 + idx, 8, fd, ioStatus)
      const sPtr = buf.readUInt32LE()
      const ePtr = buf.readUInt32LE(4)
      return { sPtr, ePtr }
    }
  }

  async [getBuffer] (offset:any, length:any, fd:any, ioStatus:any) {
    if (this._buffer) {
      return this._buffer.subarray(offset, offset + length)
    } else {
      const buf = Buffer.alloc(length)
      return new Promise((resolve, reject) => {
        ioStatus.ioCount += 1
        fs.read(fd, buf, 0, length, offset, (err:any) => {
          if (err) {
            reject(err)
          } else {
            resolve(buf)
          }
        })
      })
    }
  }

  [openFilePromise] (fileName:any) {
    return new Promise((resolve, reject) => {
      fs.open(fileName, 'r', (err:any, fd:any) => {
        if (err) {
          reject(err)
        } else {
          resolve(fd)
        }
      })
    })
  }

  async search (ip:any) {
    const startTime = process.hrtime()
    const ioStatus = {
      ioCount: 0
    }

    if (!isValidIp(ip)) {
      throw new Error(`IP: ${ip} is invalid`)
    }

    let fd = null

    if (!this._buffer) {
      fd = await this[openFilePromise](this._dbFile)
    }

    const ps = ip.split('.')
    const i0 = parseInt(ps[0])
    const i1 = parseInt(ps[1])
    const i2 = parseInt(ps[2])
    const i3 = parseInt(ps[3])

    const ipInt = i0 * 256 * 256 * 256 + i1 * 256 * 256 + i2 * 256 + i3
    const idx = i0 * VectorIndexCols * VectorIndexSize + i1 * VectorIndexSize
    const { sPtr, ePtr } = await this[getStartEndPtr](idx, fd, ioStatus)
    let l = 0
    let h = (ePtr - sPtr) / SegmentIndexSize
    let result = null

    while (l <= h) {
      const m = (l + h) >> 1

      const p = sPtr + m * SegmentIndexSize

      const buff = await this[getBuffer](p, SegmentIndexSize, fd, ioStatus)

      const sip = buff.readUInt32LE(0)

      if (ipInt < sip) {
        h = m - 1
      } else {
        const eip = buff.readUInt32LE(4)
        if (ipInt > eip) {
          l = m + 1
        } else {
          const dataLen = buff.readUInt16LE(8)
          const dataPtr = buff.readUInt32LE(10)
          const data = await this[getBuffer](dataPtr, dataLen, fd, ioStatus)
          result = data.toString('utf-8')
          break
        }
      }
    }
    if (fd) {
      fs.close(fd as number,function(){})
    }

    const diff = process.hrtime(startTime)

    const took = (diff[0] * 1e9 + diff[1]) / 1e3
    return { region: result, ioCount: ioStatus.ioCount, took }
  }
}

const _checkFile = (dbPath:any) => {
  try {
    fs.accessSync(dbPath, fs.constants.F_OK)
  } catch (err) {
    throw new Error(`${dbPath} ${err ? 'does not exist' : 'exists'}`)
  }

  try {
    fs.accessSync(dbPath, fs.constants.R_OK)
  } catch (err) {
    throw new Error(`${dbPath} ${err ? 'is not readable' : 'is readable'}`)
  }
}

const isValidIp = (ip:any) => {
  return IP_REGEX.test(ip)
}

const newWithFileOnly = (dbPath:any) => {
  _checkFile(dbPath)

  return new Searcher(dbPath, null, null)
}

const newWithVectorIndex = (dbPath:any, vectorIndex:any) => {
  _checkFile(dbPath)

  if (!Buffer.isBuffer(vectorIndex)) {
    throw new Error('vectorIndex is invalid')
  }

  return new Searcher(dbPath, vectorIndex, null)
}

const newWithBuffer = (buffer:any) => {
  if (!Buffer.isBuffer(buffer)) {
    throw new Error('buffer is invalid')
  }

  return new Searcher(null, null, buffer)
}

const loadVectorIndexFromFile = (dbPath:any) => {
  const fd = fs.openSync(dbPath, 'r')
  const buffer = Buffer.alloc(VectorIndexLength)
  fs.readSync(fd, buffer, 0, VectorIndexLength, 256)
  fs.close(fd,function(){})
  return buffer
}

const loadContentFromFile = (dbPath:any) => {
  const stats = fs.statSync(dbPath)
  const buffer = Buffer.alloc(stats.size)
  const fd = fs.openSync(dbPath, 'r')
  fs.readSync(fd, buffer, 0, stats.size, 0)
  fs.close(fd,function(){})
  return buffer
}

// 下载地址：https://raw.githubusercontent.com/lionsoul2014/ip2region/master/data/ip2region.xdb
const searcher = newWithFileOnly('server/data/ip2region.xdb')

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
      if (!res || !res.hasOwnProperty('region') || !res.region) {
        resolve({code: 500, message: 'Parsing failed', data: res})
      }
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