
interface Person {
    name:string,
    age?:number
}

type Dog = {
    [key in keyof Person]+?: string
}

let dog:Dog = {}
