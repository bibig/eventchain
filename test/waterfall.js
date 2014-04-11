var Eventchain = require('../index');
var ec = Eventchain.create();
// var ec = Eventchain.create('waterfall');
var fn = function (id, next) {
  setTimeout(function () {
    console.log('i am No.%d', id);
    next(null, id + 1);
  }, 1000);
};


ec.add(fn);
ec.add(fn);
ec.add(fn);
ec.add(fn);
ec.add(fn);


/*ec.add(function (id, next) {
  setTimeout(function () {
    next(new Error('im tired!'));
  }, 1000);
});
*/
ec.add(fn);

ec.emit(100, function (e) {
  if (e) { 
    console.error(e);
    return;
  } else {
  
    // there is no event any more
    ec.emit(200, function (e) {
      if (e) { 
        console.error(e);
        return;
      }  
    });
  }

});

