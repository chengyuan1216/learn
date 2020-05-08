let target: Array<number> = [1, 2,3]

let proxy = new Proxy(target, {
    get(target, key, receiver) {
        return target[key as number]
    }
})

proxy[1]

// function out() {
//     return function inner() {
//         return true
//     }
// }


interface Out {
    ():Inner
}

interface Inner {
    ():Inner1
}

interface Inner1 {
    ():()=>RegExp
}

type nestFn1 = ReturnType<ReturnType<Out>>

type NestReturn<T extends (...args: any) => any> = ReturnType<T> extends Function? ReturnType<ReturnType<T>>: T

type trrr = NestReturn<Out>