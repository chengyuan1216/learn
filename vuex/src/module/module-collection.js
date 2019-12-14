import Module from './module'
import { assert, forEachValue } from '../util'

export default class ModuleCollection {
  constructor (rawRootModule) {
    // register root module (Vuex.Store options)
    this.register([], rawRootModule, false)
  }

  // 通过path获取模块
  get (path) {
    return path.reduce((module, key) => {
      return module.getChild(key)
    }, this.root)
  }

  // 根据path获取命名空间
  getNamespace (path) {
    let module = this.root
    return path.reduce((namespace, key) => {
      module = module.getChild(key)
      return namespace + (module.namespaced ? key + '/' : '')
    }, '')
  }

  // 更新rootModule
  update (rawRootModule) {
    update([], this.root, rawRootModule)
  }

  // 遍历注册所有模块
  register (path, rawModule, runtime = true) {
    if (process.env.NODE_ENV !== 'production') {
      assertRawModule(path, rawModule)
    }

    // 每一个模块都是一个Moudle对象
    const newModule = new Module(rawModule, runtime)
    // 如果path是一个空数组那么表示这是一个根模块
    if (path.length === 0) {
      this.root = newModule
    } else {
      // 如果是一个子模块九江当前模块加入到父模块
      const parent = this.get(path.slice(0, -1))
      parent.addChild(path[path.length - 1], newModule)
    }

    // register nested modules
    // 如果有子模块则遍历生成对应的Moudle对象
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        // 将当前模块名加入到path数组
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }

  // 注销指定模块
  unregister (path) {
    // 先获取父模块
    const parent = this.get(path.slice(0, -1))
    // 当前模块
    const key = path[path.length - 1]
    // ??
    if (!parent.getChild(key).runtime) return
    // 将当前模块从父模块移除
    parent.removeChild(key)
  }
}

function update (path, targetModule, newModule) {
  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, newModule)
  }

  // update target module
  // 先更新targetModule
  targetModule.update(newModule)

  // update nested modules
  // 如果newModule有子模块的话则会更新子模块
  if (newModule.modules) {
    for (const key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            `[vuex] trying to add a new module '${key}' on hot reloading, ` +
            'manual reload is needed'
          )
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      )
    }
  }
}

const functionAssert = {
  assert: value => typeof value === 'function',
  expected: 'function'
}

const objectAssert = {
  assert: value => typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'),
  expected: 'function or object with "handler" function'
}

const assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
}

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(key => {
    if (!rawModule[key]) return

    const assertOptions = assertTypes[key]

    forEachValue(rawModule[key], (value, type) => {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      )
    })
  })
}

function makeAssertionMessage (path, key, type, value, expected) {
  let buf = `${key} should be ${expected} but "${key}.${type}"`
  if (path.length > 0) {
    buf += ` in module "${path.join('.')}"`
  }
  buf += ` is ${JSON.stringify(value)}.`
  return buf
}
