for Target in waff._EventTargets
  Target::emit = (event, data) ->
    dispatch = ->
      args = waff.__toarray arguments
      el = args.shift()
      ev = args.shift()
      if el.dispatchEvent?
        args.unshift ev
        el.dispatchEvent.apply el, args
      else
        args.unshift 'on' + ev
        el.fireEvent.apply el, args
    self = if @emitter? then @emitter else @
    _this = if @emitter? then @obj else @
    if typeof event == 'string'
      event = new Event event
    if typeof event == 'object'
      event.waffData = data if data
    event.waffThis = _this
    dispatch self, event
