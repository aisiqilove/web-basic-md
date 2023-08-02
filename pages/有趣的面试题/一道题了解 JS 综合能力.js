
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}

Foo.getName();
// 2 
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();

// 拓展
{
    function Foo() {
        this.getName = function () {
            console.log(3);
            return {
                getName: getName //这个就是第六题中涉及的构造函数的返回值问题
            }
        };
        //这个就是第六题中涉及到的，JS构造函数公有方法和原型链方法的优先级
        getName = function () {
            console.log(1);
        };
        return this
    }
    Foo.getName = function () {
        console.log(2);
    };
    Foo.prototype.getName = function () {
        console.log(6);
    };
    var getName = function () {
        console.log(4);
    };

    function getName() {
        console.log(5);
    }
}