
async function async1() {
    console.log("AAAA");
    async2();
    console.log("BBBB");
}
async function async2() {
    console.log("CCCC");
}
console.log("DDDD");
setTimeout(function () {
    console.log("FFFF");
}, 0);
async1();
new Promise(function (resolve) {
    console.log("GGGG");
    resolve();
}).then(function () {
    console.log("HHHH");
});
console.log("IIII");

// 被套路了 没有await