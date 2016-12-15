var checkEvents = function(self) {
  if (self.__events == null) {
    self.__events = {};
    self.__event_handlers = {};
    if (self.addEventListener != null) self.__events_inited = [];
  }
};

/**
 * EventEmitter class.
 *
 * @class
 * @alias module:waff.EventEmitter
 */
var EventEmitter = function EventEmitter() {
  checkEvents(this);
};

/**
 * Add listener for event
 *
 * @param {string} event - event name
 * @param {function} callback - listener
 * @example
 * waff.on('ready', function() {
 *   // waff is loaded
 * });
 */
EventEmitter.prototype.on = on = function(event, callback) {
  checkEvents(this);

  if (this.__events[event] == null) {
    this.__events[event] = [];
  }

  if (this.__event_handlers[event] == null) {
    this.__event_handlers[event] = function() {
      return true;
    };
  }

  if (this.addEventListener != null && !~this.__events_inited.indexOf(event)) {
    this.__events_inited.push(event);
    this.addEventListener(event, function(evt) {
      var callbacks = this.__events[event];
      for (var i = 0; i < callbacks.length; ++i) {
        callbacks[i].call(this, evt.__data || evt);
      }
    });
  }

  var addEvent = this.__event_handlers[event].call(this, callback);
  if (addEvent !== false) {
    this.__events[event].push(callback);
  }

  return this;
};

/**
 * Remove listener for event
 *
 * @param {string} event - event name
 * @param {function} [ callback ] - listener
 * @example
 * waff.off('ready', handler); // remove specific listener
 * waff.off('ready'); // remove all listeners
 */
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

  return this;
};

/**
 * Handle adding specific event with {@link on}
 *
 * @param {string} event - event name
 * @param {function} callback - handler
 */
EventEmitter.prototype.handler = function(event, callback) {
  this.__event_handlers[event] = callback;
  return this;
};

/**
 * Emit event
 *
 * @param {string} event - event name
 * @param {object} data - event data
 * @example
 * document.body.emit('click');
 */
EventEmitter.prototype.emit = function(event, data) {
  if (this.__events[event] != null) {
    if (this.addEventListener != null) {
      if (event instanceof Event === false) event = new Event(event);
      event.__data = data;
      event.__data.originalEvent = event;
      this.dispatchEvent(event);
    } else {
      var callbacks = this.__events[event];
      for (var i = 0; i < callbacks.length; ++i) {
        callbacks[i].call(this, data);
      }
    }
  }

  return this;
};

var targets = [];
try {
  EventTarget.prototype.waff = '<3';
  if (EventTarget.prototype.waff !== Element.prototype.waff) throw ':(';
  targets.push(EventTarget);
} catch (e) {
  [].push.apply(targets, [
    window.constructor,
    Element,
    Document,
    Node
  ]);

  if ('XMLHttpRequestEventTarget' in window)
    targets.push(XMLHttpRequestEventTarget);
}

for (var i = 0; i < targets.length; ++i) {
  var target = targets[i];
  target.prototype.on = EventEmitter.prototype.on;
  target.prototype.off = EventEmitter.prototype.off;
  target.prototype.emit = EventEmitter.prototype.emit;
  target.prototype.handler = EventEmitter.prototype.handler;
}

module.exports = EventEmitter;
