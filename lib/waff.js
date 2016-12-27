/**
 * waff-query module
 *
 * @module waff
 */

var EventEmitter = require('./classes/EventEmitter');
var classes = require('./util/classes');
var objects = require('./util/object');

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

  this.EventEmitter = EventEmitter;

  var query = require('./element/query');
  objects.export([this, global], ['q', 'query'], query);
  objects.export([this, global], ['qq', 'queryAll'], query.all);

  var element = require('./element/create');
  objects.export([this, global], ['e', 'element'], element);

  var text = require('./text/create');
  objects.export([this, global], ['t', 'text'], text);

  require('./element');
  require('./text');

  // emit ready event
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
};

classes.extend(waff, EventEmitter);

module.exports = new waff;
