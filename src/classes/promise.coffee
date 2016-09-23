(->
  class Promise extends waff._EventEmitter


    ###*
    # @class waff#Promise
    # @extends waff#EventEmitter
    # @classdesc Own implementation of Promises. Can bind `this` to functions called in `then` and `catch` and also passes all arguments to them.
    # @param {Function} executor - Executor function
    # @fires fulfill
    # @fires reject
    ###
    constructor: (executor) ->

      super()

      @_then = []
      @_catch = []

      executor @_resolve(@), @_reject(@)

    ###*
    # @function waff#Promise#then
    # @desc Adds handler when fulfilled or rejected
    # @param {Function} onFulfill - Fulfiull function
    # @param {Function} [onReject] - Reject function
    # @returns {waff#Promise} instance
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
    # @function waff#Promise#catch
    # @desc Adds handler when rejected
    # @param {Function} onReject - Reject function
    # @returns {waff#Promise} instance
    # @example
    # var promise = new waff.Promise(function(){})
    # promise.catch(function(){
    #
    # })
    ###
    catch: (handler) ->
      @_catch.push handler
      @

    _resolve: (self) ->
      ->
        ###*
        # @event waff#Promise#fulfill
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
    ###*
    # @function waff#Promise#resolve
    # @desc Resolves promise
    # @param {*} ..arg - Arguments to pass
    # @returns {waff#Promise} instance
    # @example
    # var promise = new waff.Promise(function(){})
    # promise.resolve()
    ###
    resolve: ->
      @_resolve(@).apply @, arguments
      @

    _reject: (self) ->
      ->
        ###*
        # @event waff#Promise#reject
        # @desc Event emitted on reject
        # @example
        # var promise = new waff.Promise(function(){})
        # promise.on('reject', function(){
        #  // same as promise.catch
        # })
        ###
        self.emit 'reject', arguments
        for handler in self._catch
          handler.apply @, arguments
    ###*
    # @function waff#Promise#reject
    # @desc Rejects promise
    # @param {*} ..arg - Arguments to pass
    # @returns {waff#Promise} instance
    # @example
    # var promise = new waff.Promise(function(){})
    # promise.reject()
    ###
    reject: ->
      @_reject(@).apply @, arguments

  Promise
)()
