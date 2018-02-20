# ensure-params

Provide simple checks of method parameters on NodeJS

## installation

`npm install --save ensure-params`

## usage

```
const ensure = require('ensure-params')

class HelloSomeone {
    print (name) {
        ensure.param('name', name)
            .isRequired()
            .isString()
        console.write('Hello ' + name)
    }
}
```