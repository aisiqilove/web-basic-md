```
题目描述
实现一个CodingMan，可以按照以下方式调用: ​

CodingMan("Hank") 输出: ​
Hi! This is Hank! ​

CodingMan("Hank").sleep(10).eat("dinner") 输出 ​
Hi! This is Hank! ​
// 等待10秒.. ​
Wake up after 10s ​
Eat dinner~ ​

CodingMan("Hank").eat("dinner").eat("supper") 输出 ​
Hi This is Hank! ​
Eat dinner~ ​
Eat supper~ ​

CodingMan("Hank").sleepFirst(5).eat("supper") 输出 ​
// 等待5秒 ​
Wake up after 5s ​
Hi This is Hank! ​
Eat supper ​

以此类推。
```