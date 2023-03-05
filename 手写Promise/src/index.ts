import MyPromise from "./core";
const promise = new MyPromise((reslove, reject) => {
    setTimeout(() => {
        reslove("哈哈哈")
    },0)
})
promise.then(res => {
    console.log(res)
}, err => {
    console.log(err,"错误")
})
promise.then(res => {
    console.log(res)
})
promise.then(res => {
    console.log(res)
})





const promise1 = new Promise((reslove, reject) => {
    reslove("sb")
}).then(res =>console.log(res))