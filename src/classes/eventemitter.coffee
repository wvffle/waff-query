(->
  class EventEmitter
    ###*
    # @class waff#EventEmitter
    # @classdesc Own implementation of EventEmitter. (untested)
    # @example
    # var ee = new waff.EventEmitter();
    ###
    constructor: ->
      @_emitter = waff.e()

    ###*
    # @function waff#EventEmitter#on
    # @desc Adds handler for event
    # @param {String|Array<String>} event - Name of event
    # @param {Function} handler - Handler function
    # @param {Boolean} [capture] - Use capture
    # @returns {waff#EventEmitter} instance
    # @example
    # var ee = new waff.EventEmitter();
    # // Single event binding
    # ee.on('event-name', function(data){})
    # // Multi event binding
    # ee.on(['event-name', 'event-name2'], function(data){})
    ###
    on: (event, handler, capture) ->
      @_emitter.on.call {emitter: @_emitter, obj: @}, event, handler, capture

    ###*
    # @function waff#EventEmitter#once
    # @desc Adds handler only for one event emit
    # @param {String|Array<String>} event - Name of event
    # @param {Function} handler - Handler function
    # @param {Boolean} [capture] - Use capture
    # @returns {waff#EventEmitter} instance
    # @example
    # var ee = new waff.EventEmitter();
    # // Single event binding
    # ee.once('event-name', function(data){})
    # // Multi event binding
    # ee.once(['event-name', 'event-name2'], function(data){})
    ###
    once: (event, handler, capture) ->
      @_emitter.once.call {emitter: @_emitter, obj: @}, event, handler, capture

    ###*
    # @function waff#EventEmitter#off
    # @desc Removes specific event handler
    # @param {String|Array<String>} event - Name of event
    # @param {Function} [handler] - Handler function
    # @param {Boolean} [capture] - Use capture
    # @returns {waff#EventEmitter} instance
    # @example
    # var ee = new waff.EventEmitter();
    # // Single event unbinding for a specific handler
    # ee.off('event-name', function(){})
    # // Multi event unbinding for a specific handler
    # ee.off(['event-name', 'event-name2'], function(){})
    # // Unbinding all handlers for event
    # ee.off('event-name')
    ###
    off: (event, handler, capture) ->
      @_emitter.off.call {emitter: @_emitter, obj: @}, event, handler, capture

    ###*
    # @function waff#EventEmitter#emit
    # @desc Emits event
    # @param {String} event - Name of event
    # @param {Object} [data] - Data to pass
    # @returns {waff#EventEmitter} instance
    # @example
    # var ee = new waff.EventEmitter();
    # // Emitting event
    # ee.emit('event-name')
    # // Emitting event with data
    # ee.emit('event-name', {my: 'data'})
    ###
    emit: (event, data) ->
      @_emitter.emit.call {emitter: @_emitter, obj: @}, event, data

    dispatchEvent: (event, handler, capture) ->
      @_emitter.dispatchEvent.call @_emitter, event, handler, capture


  ###*
  # @function waff#EventEmitter.extend
  # @static
  # @desc Extends events on object
  # @param {Object} object - Object to extend
  # @returns object
  # @example
  # var obj = {};
  # EventEmitter.extend(obj);
  # obj.emit('event!')
  ###
  EventEmitter.extend = (object)->
    emitter = object._emitter = waff.e()
    object.on = emitter.on.bind {emitter: emitter, obj: object} unless object.on?
    object.once = emitter.once.bind {emitter: emitter, obj: object} unless object.once?
    object.off = emitter.off.bind {emitter: emitter, obj: object} unless object.off?
    object.dispatchEvent = emitter.dispatchEvent.bind emitter unless object.dispatchEvent?
    object.emit = emitter.emit.bind {emitter: emitter, obj: object} unless object.emit?
    object

  EventEmitter
)()
