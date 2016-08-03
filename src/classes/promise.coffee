(->
  ###*
  # @class waff.Promise waff.Promise
  # @classdesc Own implementation of Promises. Can bind `this` to functions called in `then` and `catch` and also passes all arguments to them.
  ###
  class Promise
    constructor: (executor) ->
      @_then = []
      @_catch = []

      executor @resolve(@), @reject(@)

    then: (handler, errHandler) ->
      @_then.push handler
      if errHandler?
        @_catch.push errHandler
      @

    catch: (handler) ->
      @_catch.push handler
      @

    resolve: (self) ->
      ->
        for handler in self._then
          handler.apply @, arguments

    reject: (self) ->
      ->
        for handler in self._then
          handler.apply @, arguments

  Promise
)()
