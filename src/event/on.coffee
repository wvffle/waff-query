for Target in waff._EventTargets
  Target::on = (name, next, capture) ->
    listen = ->
      args = [].slice.call arguments
      el = args.shift()
      ev = args.shift()
      if el.addEventListener?
        args.unshift ev
        el.addEventListener.apply el, args
      else
        args.unshift 'on' + ev
        el.attachEvent.apply el, args
    unless name instanceof Array
      name = [ name ]

    self = if @emitter? then @emitter else @
    _this = if @emitter? then @obj else @

    self._events = {} unless self._events?
    self._eventsInited = {} unless self._eventsInited?

    for event in name
      self._events[event] = [] unless self._events[event]?

      self._events[event].push next
      if self._eventsInited[event] != true
        listen self, event, ((ev) ->
          ev = ev.waffData if ev.waffData?
          for handler in self._events[event]
            handler.call _this, ev
        ), capture
      self._eventsInited[event] = true
    self
