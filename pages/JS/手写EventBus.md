#### 手写EventBus

```js
class Bus {
      constructor() {
        this.callbacks = {}
      }

      $on(name, fn) {
        this.callbacks[name] = this.callbacks[name] || []
        this.callbacks[name].push(fn)
      }
      $emit(name, data) {
        if (this.callbacks[name]) {
          this.callbacks[name].forEach(fn => fn(data));
        }
      }
    }

    let eBus = new Bus()

    eBus.$on('eBus', data => {
      console.log(data)
    })

    eBus.$emit('eBus', { eBus: 'eBus1' })
    eBus.$emit('eBus', { eBus: 'eBus2' })
    eBus.$emit('eBus', { eBus: 'eBus3' })
```