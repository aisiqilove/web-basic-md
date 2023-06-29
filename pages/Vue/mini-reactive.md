## Vue3中的reactive

``` js

// 临时收集函数栈
let effectStack = []
// 依赖映射 存放响应式函数和⽬标、键之间的映射关系
let targetMap = new WeakMap()

// 数据响应 new Proxy
function reactive(obj) {
    if(!isObject(obj)) {
        return obj
    }
    // 解决vue2 不支持array Set Map 对象动态新增/删除 vue2 递归所有key 速度慢
    // proxy 代理整个对象，内存减少一半 编译提高一半 懒执行
    // Reflect⽤于执⾏对象默认操作，更规范、更友好
    return new Proxy(obj, {
        get(target, key) {
            track(target, key)
            const res = Reflect.get(target, key)
            return isObject(res) ? reactive(res) : res
        },
        set(target, key, value) {
            trigger(target, key)
            const res = Reflect.set(target, key, value)
            return res
        },
        deleteProperty(target, key) {
            trigger(target, key)
            const res = Reflect.deleteProperty(target, key)
            return res
        },
    })
}
function isObject(v) {
    return v !== null && typeof v === 'object'
}
// 收集函数 将传⼊fn转换为⼀个响应式函数
function Effect(fn, options = {}) {
    const c = createReactiveEffect(fn, options)
    // 触发一次依赖收集
    c()
    return c
}
function createReactiveEffect(fn, options) {
    // 封装⼀个⾼阶函数，除了执⾏fn，还要将⾃⼰放⼊effectStack为依赖收集做准备
    // 入栈 执行fn 出栈
    const effect = (...args) => {
        try{
            effectStack.push(effect)
            return fn(...args)
        } finally {
            effectStack.pop()
        }
    }
    return effect
}
// 依赖收集，创建映射关系
function track(target, key) {
    // 获取响应式函数
    const effect = effectStack[effectStack.length - 1]
    if(effect) {
        // 获取target映射关系map，不存在则创建
        let depMap = targetMap.get(target)
        if(!depMap) {
            depMap = new Map()
            targetMap.set(target, depMap)
        }
        // 获取key对应的依赖集合，不存在则创建
        let deps = depMap.get(key)
        if(!deps) {
            deps = new Set()
            depMap.set(key, deps)
        }
        // 将响应函数添加到依赖集合
        deps.add(effect)
    }
}
// 根据映射关系获取响应函数 执行函数
function trigger(target, key) {
    // 获取target对应依赖map
    let depMap = targetMap.get(target)
    if(!depMap) {
        return
    }
    // 获取key对应集合
    let deps = depMap.get(key)
    // 执⾏所有响应函数
    if(deps) {
        const effect = new Set()
        const computedRunners = new Set()
        deps.forEach(dep => {
            if(dep.computed) {
                computedRunners.add(dep)
            } else {
                effect.add(dep)
            }
        })
        computedRunners.forEach(computed => computed())
        effect.forEach(effect => effect())
    }
}

function computed(fn) {
    // 创建⼀个特殊的effect：
    // 这个effect创建时不会⽴刻执⾏，且会在其他effect后⾯执⾏
    const runner = effect(fn, { computed: true, lazy: true })
    // 返回⼀个对象包含响应函数和最新值的getter
    // 这样computed⾸次获取值时才收集依赖
    return {
        effect: runner,
        get value() {
            return runner()
        }
    }
}

let obj = reactive({ name: 'foo', age: 18 })

Effect(() => {
    console.log('e 1', obj.name)
    app.innerHTML = `<div>${obj.name}</div>`
    setTimeout(() => {
        obj.name = 'effect foo'
    },1000)
})

```
