# ensure-params

Provide simple checks for method / function parameters.

## installation

`npm install --save ensure-params`

## usage

```
const ensure = require('ensure-params')

class HelloSomeone {
  static print (name) {
    ensure.param('name', name)
      .isRequired()
      .isString()
    console.log('Hello ' + name)
  }
}

HelloSomeone.print('test') // will succeed
HelloSomeone.print() // will fail and throws an error
HelloSomeone.print(null) // will fail and throws an error
HelloSomeone.print(1) // will fail and throws an error
```
