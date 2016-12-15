var EventEmitter = require('./classes/EventEmitter');
var classes = require('./util/classes');

var waff = function waff() {
  classes.super(this);
  var self = this;

  var state = function() {
    return document.readyState === 'complete' || document.readyState === 'interactive';
  };

  this.handler('ready', function(callback) {
    if (state()) {
      callback();
      return false;
    }
  });

  if (state()) {
    this.emit('ready');
  } else {
    var handler = function() {
      if (state()) {
        document.removeListener('readystatechange', handler);
        self.emit('ready');
      }
    };

    document.addEventListener('readystatechange', handler);
  }

  this.EventEmitter = EventEmitter;
};

classes.extend(waff, EventEmitter);

module.exports = new waff;
