EventTarget::emit = (event, data) ->
  self = if @emitter? then @emitter else @
  _this = if @emitter? then @obj else @
  if typeof event == 'string'
    event = new Event event
  if typeof event == 'object'
    event.waffData = data if data
  event.waffThis = _this
  self.dispatchEvent  event
