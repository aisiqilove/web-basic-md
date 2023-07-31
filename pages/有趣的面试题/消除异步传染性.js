// react suspense
function getUser() {
    return fetch('./user.json');
}

function m1() {
    return getUser();
}

function m2() {
    return m1();
}

function main() {
    const user = m2();
    console.log(user)
    return user;
}

function run(fun) {
    let cache = {
        status: 'pending',
        value: null
    };
    let oldFetch = window.fetch;

    window.fetch = function (...args) {
        if (cache.status === 'fulfilled') {
            return cache.value;
        }
        if (cache.status === 'rejected') {
            throw cache.value
        }

        const prom = oldFetch(...args)
            .then(resp => resp.json())
            .then(res => {
                cache.status = 'fulfilled';
                cache.value = res;
            }).catch(err => {
                cache.status = 'rejected';
                cache.value = err;
            })

        throw prom;
    }

    try {
        func();
    } catch (e) {
        if (e instanceof Promise) {
            e(func, func).finally(() => {
                window.fetch = oldFetch;
            })
        }
    }
}

run(main)