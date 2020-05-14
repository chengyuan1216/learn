import { ErrorCodes, callWithErrorHandling } from './errorHandling'
import { isArray } from '@vue/shared'

const queue: (Function | null)[] = [] // 保存queueJob
const postFlushCbs: Function[] = [] // 
const p = Promise.resolve()

let isFlushing = false // 标识异步任务是否正在执行
let isFlushPending = false // 标识异步任务是否开启

const RECURSION_LIMIT = 100
// 统计某个方法执行的次数
type CountMap = Map<Function, number>

// $nextTick 其实是就是一个promise
export function nextTick(fn?: () => void): Promise<void> {
  return fn ? p.then(fn) : p
}

// 将任务加入队列, 框架内部任务使用
export function queueJob(job: () => void) {
  if (!queue.includes(job)) {
    queue.push(job)
    queueFlush()
  }
}

// 取消某个任务
export function invalidateJob(job: () => void) {
  const i = queue.indexOf(job)
  if (i > -1) {
    queue[i] = null
  }
}

// 往队列里添加任务，框架使用者定义的任务使用
export function queuePostFlushCb(cb: Function | Function[]) {
  if (!isArray(cb)) {
    postFlushCbs.push(cb)
  } else {
    postFlushCbs.push(...cb)
  }
  // 启动任务
  queueFlush()
}

// 启动任务
function queueFlush() {
  // 如果当前已经开启了异步任务，就不再再次启动
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true
    nextTick(flushJobs)
  }
}

// 去重, 并且返回一个新的数组
const dedupe = (cbs: Function[]): Function[] => [...new Set(cbs)]

export function flushPostFlushCbs(seen?: CountMap) {
  if (postFlushCbs.length) {
    const cbs = dedupe(postFlushCbs)
    postFlushCbs.length = 0
    if (__DEV__) {
      seen = seen || new Map()
    }
    for (let i = 0; i < cbs.length; i++) {
      if (__DEV__) {
        checkRecursiveUpdates(seen!, cbs[i])
      }
      cbs[i]()
    }
  }
}

function flushJobs(seen?: CountMap) {
  isFlushPending = false
  isFlushing = true
  let job
  if (__DEV__) {
    seen = seen || new Map()
  }

  // 执行queue队列
  while ((job = queue.shift()) !== undefined) {
    if (job === null) {
      continue
    }
    // 在开发环境会检查某个函数执行的次数， 如果执行的次数超过一百次可能是循环调用将会抛出警告
    if (__DEV__) {
      checkRecursiveUpdates(seen!, job)
    }
    callWithErrorHandling(job, null, ErrorCodes.SCHEDULER)
  }
  flushPostFlushCbs(seen)
  isFlushing = false
  // some postFlushCb queued jobs!
  // keep flushing until it drains.
  if (queue.length || postFlushCbs.length) {
    flushJobs(seen)
  }
}

function checkRecursiveUpdates(seen: CountMap, fn: Function) {
  if (!seen.has(fn)) {
    seen.set(fn, 1)
  } else {
    const count = seen.get(fn)!
    if (count > RECURSION_LIMIT) {
      throw new Error(
        'Maximum recursive updates exceeded. ' +
          "You may have code that is mutating state in your component's " +
          'render function or updated hook or watcher source function.'
      )
    } else {
      seen.set(fn, count + 1)
    }
  }
}
