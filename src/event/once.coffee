EventTarget::once = (event, next, capture) ->
  self = if @emitter? then @emitter else @
  _this = if @emitter? then @obj else @

  n = (ev) ->
    next.call _this, ev
    @off event, n, capture

  self.on event, n, capture
  self
