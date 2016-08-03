EventTarget::on = (name, next, capture) ->
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
      self.addEventListener event, ((ev) ->
        ev = ev.waffData if ev.waffData?
        for handler in self._events[event]
          handler.call _this, ev
      ), capture
    self._eventsInited[event] = true
  self

Element::on = (name, next, capture) ->
  unless name instanceof Array
    name = [ name ]

  _on = EventTarget::on

  for event in name
    switch event
      when 'mutation'
        @_observerHandlers.push next
      else
        _on.apply this, arguments
  @
