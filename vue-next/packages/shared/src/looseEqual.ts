import { isObject, isArray } from './'
// 判断a与b是否相等对于引用类型会遍历判断， 而不是通过引用地址判断
export function looseEqual(a: any, b: any): boolean {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = isArray(a)
      const isArrayB = isArray(b)
      if (isArrayA && isArrayB) {
        // 如果是数组， 则判断数组长度是否相等
        // 并且数组对应的每一项都通过looseEqual是否相等
        return (
          a.length === b.length &&
          a.every((e: any, i: any) => looseEqual(e, b[i]))
        )
      } else if (a instanceof Date && b instanceof Date) {
        // 判断Date类型是否相等，直接判断时间戳是否相等
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        // 如果是对象则判断每一项是否相等
        return (
          keysA.length === keysB.length &&
          keysA.every(key => looseEqual(a[key], b[key]))
        )
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

export function looseIndexOf(arr: any[], val: any): number {
  return arr.findIndex(item => looseEqual(item, val))
}
