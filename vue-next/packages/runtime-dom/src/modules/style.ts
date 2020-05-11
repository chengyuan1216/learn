import { isString, hyphenate, capitalize } from '@vue/shared'
import { camelize } from '@vue/runtime-core'

type Style = string | Partial<CSSStyleDeclaration> | null

export function patchStyle(el: Element, prev: Style, next: Style) {
  const style = (el as HTMLElement).style
  // 如果next不存在则直接移除style属性， 移除所有通过style设置的样式
  if (!next) {
    el.removeAttribute('style')
  } else if (isString(next)) {
    // 如果是字符串直接赋值
    style.cssText = next
  } else {
    // 如果是一个对象
    for (const key in next) {
      setStyle(style, key, next[key] as string)
    }
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (!next[key]) {
          setStyle(style, key, '')
        }
      }
    }
  }
}

const importantRE = /\s*!important$/


// dom.style ==> CSSStyleDeclaration
function setStyle(style: CSSStyleDeclaration, name: string, val: string) {
  if (name.startsWith('--')) {
    // custom property definition
    style.setProperty(name, val)
  } else {
    const prefixed = autoPrefix(style, name)
    if (importantRE.test(val)) {
      // !important
      style.setProperty(
        hyphenate(prefixed),
        val.replace(importantRE, ''),
        'important'
      )
    } else {
      style[prefixed as any] = val
    }
  }
}

// 浏览器前缀
const prefixes = ['Webkit', 'Moz', 'ms']
const prefixCache: Record<string, string> = {}

// 添加浏览器前缀
function autoPrefix(style: CSSStyleDeclaration, rawName: string): string {
  const cached = prefixCache[rawName]
  if (cached) {
    return cached
  }
  let name = camelize(rawName)
  if (name !== 'filter' && name in style) {
    return (prefixCache[rawName] = name)
  }
  name = capitalize(name)
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name
    if (prefixed in style) {
      return (prefixCache[rawName] = prefixed)
    }
  }
  return rawName
}
