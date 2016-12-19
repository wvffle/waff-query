/**
 * waff-query module
 *
 * @module waff
 */

var EventEmitter = require('./classes/EventEmitter');
var classes = require('./util/classes');

var waff = function waff() {
  classes.super(this);
  var self = this;

  var state = function() {
    return document.readyState === 'complete' ||
        document.readyState === 'interactive';
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

  var query = require('./element/query');
  this.query = this.q = global.query = global.q = query;
  this.queryAll = this.qq = global.queryAll = global.qq = query.all;

  // require prototypes
  require('./element/prototype/after');
  require('./element/prototype/append');
  require('./element/prototype/before');
  require('./element/prototype/prepend');

  require('./element/prototype/attr');
  require('./element/prototype/clear');

  // require properties
  require('./element/properties/classes');
};

classes.extend(waff, EventEmitter);

module.exports = new waff;
