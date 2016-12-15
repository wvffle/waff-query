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
