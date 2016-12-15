(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.waff = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var checkEvents = function(self) {
  if (self.__events == null) {
    self.__events = {};
    self.__event_handlers = {};
    if (self.addEventListener != null) self.__events_inited = [];
  }
};

/**
 * EventEmitter class.
 * @class
 */
var EventEmitter = function EventEmitter() {
  checkEvents(this);
};

EventEmitter.prototype.on = function(event, callback) {
  checkEvents(this);

  if (this.__events[event] == null) {
    this.__events[event] = [];
  }

  if (this.__event_handlers[event] == null) {
    this.__event_handlers[event] = function() {
      return true;
    };
  }

  if (this.addEventListener != null && ~this.__events_inited.indexOf(event)) {
    this.__events_inited.push(event);
    this.addEventListener(event, function(data) {
      var callbacks = this.__events[event];
      for (var i = 0; i < callbacks.length; ++i) {
        callbacks[i].call(this, data);
      }
    });
  }

  var addEvent = this.__event_handlers[event].call(this, callback);
  if (addEvent !== false) {
    this.__events[event].push(callback);
  }

};

EventEmitter.prototype.off = function(event, callback) {
  if (this.__events[event]) {
    if (callback == null) {
      this.__events[event] = [];
    } else {
      var index = this.__events[event].indexOf(callback);
      if (index !== -1) {
        this.__events[event].splice(index, 1);
      }
    }
  }
};

EventEmitter.prototype.handler = function(event, callback) {
  this.__event_handlers[event] = callback;
};

EventEmitter.prototype.emit = function(event, data) {
  if (this.__events[event] != null) {
    if (this.addEventListener != null) {
      this.dispatchEvent(new Event(event));
    } else {
      var callbacks = this.__events[event];
      for (var i = 0; i < callbacks.length; ++i) {
        callbacks[i].call(this, data);
      }
    }
  }
};

module.exports = EventEmitter

},{}],2:[function(require,module,exports){
var extend = function(_extended, _super) {
  _extended.prototype = Object.create(_super.prototype);
};

var _super = function(instance) {
  var params = [].slice.call(arguments);
  params.shift();
  instance.constructor.apply(instance, params);
};

var classes = {
  extend: extend,
  super: _super
};

module.exports = classes;

},{}],3:[function(require,module,exports){
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

},{"./classes/EventEmitter":1,"./util/classes":2}]},{},[3])(3)
});