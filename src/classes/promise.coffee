(->
  class Promise
    ###*
    # @class waff.Promise
    # @extends waff.EventEmitter
    # @classdesc Own implementation of Promises. Can bind `this` to functions called in `then` and `catch` and also passes all arguments to them.
    # @param {Function} executor - Executor function
    # @fires fulfill
    # @fires reject
    ###
    constructor: (executor) ->
      Event.extend @
      @_then = []
      @_catch = []

      executor @resolve(@), @reject(@)

    ###*
    # @function waff.Promise.then
    # @desc Adds handler when fulfilled or rejected
    # @param {Function} onFulfill - Fulfiull function
    # @param {Function} [onReject] - Reject function
    # @example
    # var promise = new waff.Promise(function(){})
    # promise.then(function(){
    #
    # })
    ###
    then: (handler, errHandler) ->
      @_then.push handler
      if errHandler?
        @_catch.push errHandler
      @

    ###*
    # @function waff.Promise.catch
    # @desc Adds handler when rejected
    # @param {Function} onReject - Reject function
    # @example
    # var promise = new waff.Promise(function(){})
    # promise.catch(function(){
    #
    # })
    ###
    catch: (handler) ->
      @_catch.push handler
      @

    resolve: (self) ->
      ->
        ###*
        # @event waff.Promise.fulfill
        # @desc Event emitted on fulfill
        # @example
        # var promise = new waff.Promise(function(){})
        # promise.on('fulfill', function(){
        #  // same as promise.then
        # })
        ###
        self.emit 'fulfill', arguments
        for handler in self._then
          handler.apply @, arguments

    reject: (self) ->
      ->
        ###*
        # @event waff.Promise.reject
        # @desc Event emitted on reject
        # @example
        # var promise = new waff.Promise(function(){})
        # promise.on('reject', function(){
        #  // same as promise.catch
        # })
        ###
        self.emit 'reject', arguments
        for handler in self._then
          handler.apply @, arguments

  Promise
)()
