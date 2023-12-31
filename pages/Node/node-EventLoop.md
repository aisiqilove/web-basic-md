#### node 的事件循环

![eventLoop](./loop.png)

```js
    // 为了协调异步任务，Node 居然提供了四个定时器，让任务可以在指定的时间运行。
    // process.nextTick()  在所有异步之前 所有异步需要等所有process.nextTick()执行完，再执行
    // setTimeout()
    // setInterval()
    // setImmediate()     在所有异步之后

    // 1.首先，同步任务总是比异步任务更早执行。
    // 追加在本轮循环的异步任务(微任务？)
    // 追加在次轮循环的异步任务(宏任务？)
    // process.nextTick和Promise的回调函数，追加在本轮循环，即同步任务一旦执行完成，就开始执行它们。
    // 而setTimeout、setInterval、setImmediate的回调函数，追加在次轮循环。

    // nextTickQueue
    // microTaskQueue
    // 只有前一个队列全部清空以后，才会执行下一个队列

    // process.nextTick(() => console.log(1));
    // Promise.resolve().then(() => console.log(2));
    // process.nextTick(() => console.log(3));
    // Promise.resolve().then(() => console.log(4));

    // 首先，有些人以为，除了主线程，还存在一个单独的事件循环线程。不是这样的，只有一个主线程，事件循环是在主线程上完成的。

    // 其次，Node 开始执行脚本时，会先进行事件循环的初始化，但是这时事件循环还没有开始，会先完成下面的事情。

    // 同步任务
    // 发出异步请求
    // 规划定时器生效的时间
    // 执行process.nextTick()等等
    // 最后，上面这些事情都干完了，事件循环就正式开始了。

    // 事件循环会无限次地执行，一轮又一轮。只有异步任务的回调函数队列清空了，才会停止执行。
    // 每一轮的事件循环，分成六个阶段。这些阶段会依次执行。

    // 1.timers
    // 2.I / O callbacks
    // 3.idle, prepare
    // 4.poll
    // 5.check
    // 6.close callbacks

    // 每个阶段都有一个先进先出的回调函数队列。只有一个阶段的回调函数队列清空了，该执行的回调函数都执行了，事件循环才会进入下一个阶段。
    
    // （1）timers

    // 这个是定时器阶段，处理setTimeout()和setInterval()的回调函数。进入这个阶段后，主线程会检查一下当前时间，是否满足定时器的条件。如果满足就执行回调函数，否则就离开这个阶段。

    // （2）I / O callbacks

    // 除了以下操作的回调函数，其他的回调函数都在这个阶段执行。
    // setTimeout()和setInterval()的回调函数
    // setImmediate()的回调函数
    // 用于关闭请求的回调函数，比如socket.on('close', ...)

    // （3）idle, prepare

    // 该阶段只供 libuv 内部调用，这里可以忽略。

    // （4）Poll

    // 这个阶段是轮询时间，用于等待还未返回的 I / O 事件，比如服务器的回应、用户移动鼠标等等。

    // 这个阶段的时间会比较长。如果没有其他异步任务要处理（比如到期的定时器），会一直停留在这个阶段，等待 I / O 请求返回结果。

    // （5）check

    // 该阶段执行setImmediate()的回调函数。

    // （6）close callbacks

    // 该阶段执行关闭请求的回调函数，比如socket.on('close', ...) 。

```