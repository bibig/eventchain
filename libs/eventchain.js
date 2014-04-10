var Event = require('events').EventEmitter;
var event = new Event();

var Eventchain = function (name) {
  this.name = name;
  this.count = 0;
  this.current = 0;
 };  

/**
 * the callback arguments should include `args` and `next`;
 * eg: function(record, next) {...};
 */
Eventchain.prototype.add = function (callback) {
  event.on(this.eventName(), callback);
  this.count++;
};

Eventchain.prototype.eventName = function (count) {
  count = count === undefined ? this.count : count;
  return [this.name, count].join('#');
};

Eventchain.prototype.emit = function (args, callback) {
  var self = this;
  if (this.count == 0 || this.current >= this.count) { 
    this.current = 0; 
    if (callback) { callback(); }
    return;
  }
  
  // async
  if (callback) {
    event.emit(this.eventName(this.current), args, function (e) {
      if (e) {
        callback(e);
      } else {
        self.current++;
        self.emit(args, callback);
      }
    });
  } else { // sync
    event.emit(this.eventName(this.current), args);
    self.current++;
    self.emit(args);
  }
  
};

module.exports = exports = Eventchain;