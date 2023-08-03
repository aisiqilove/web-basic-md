
// eval
function calculate(firstOperand, operation, secondOperand) {
    return eval('firstOperand' + operation + 'secondOperand');
}

// console.log(calculate(1, '+', 2)); // -> result: 3
// console.log(calculate(1, '>', 2)); // -> result: false

globalThis.a = 1
// new Function 创建的函数是无法访问到当前闭包的局部变量，只能访问全局作用域，减少了副作用的影响
function calculate(firstOperand, operation, secondOperand) {
    const calculateFn = new Function('firstOperand', 'secondOperand',
        `console.log(${globalThis.a}, 'aa');
        return firstOperand ${operation} secondOperand`);
    return calculateFn(firstOperand, secondOperand);
}

console.log(calculate(1, '+', 3));