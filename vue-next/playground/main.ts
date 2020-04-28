interface People {name:string, age:number}
type t1 = keyof People
type t2 = Pick<People, 'name' | 'age'>
type t3 = keyof any
type t4 = Record<string, number>

type Record2<U, T> = {
    [P in keyof U]: T;
}
type Re = Record2<People, number>

type t5 = Pick<People, Exclude<keyof People, 'name'>>

type Exclude1<T, U> = T extends U ? never : T;
type t6 = Exclude1<1|2, 1>
type t8 = 1|2
type t9 = 1
type t7 = t8 extends t9 ? never : t8

interface Test{
    new (): Test
}

type t10 = InstanceType<Date>