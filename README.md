### Eventchain

+ Eventchain is a module to call the callbacks on same event one after one.
+ Just like the series feature in async module, but it's powered by node built-in module "EventEmitter".
+ For better code structure, more maintainable.

### install

npm install eventchain

### Usage

```javascript

  var Eventchain = require('eventchain');
  var ec = Eventchain.create('after save');
  
  ec.add(function (record, next) {
    ...
    next()
  });
  
  ec.add(anotherCallback);
  
  ec.add(anotherCallback);
  
  
  // emit, receive a callback to handler error if it exist.
  ec.emit(function (e) {
    ...
  });

```

more detail, please see the test file.