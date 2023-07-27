Object.prototype[Symbol.iterator] = function () {
    // let index = 0
    // let keys = Object.keys(this)
    // return {
    //     next: () => {
    //         if (index < keys.length) {
    //             return {
    //                 value: this[keys[index++]],
    //                 done: false
    //             }
    //         } else {
    //             return {
    //                 value: undefined,
    //                 done: true
    //             }
    //         }
    //     }
    // }

    // return Object.values(this)[Symbol.iterator]();
}

Object.prototype[Symbol.iterator] = function* () {
    return yield* Object.values(this);
}

// 让下面成立
let [a, b] = { a: 3, b: 4 }
console.log(a, b)
// 可迭代对象 {[Symbol.iterator]: function () { return 迭代器 }} 属性是一个函数，执行后返回一个迭代器对象