EventTarget::off = (name, next, capture) ->
  unless name instanceof Array
    name = [ name ]

  self = if @emitter? then @emitter else @
  self._events = {} unless self._events?

  for event in name
    self._events[event] = [] unless self._events[event]?
    self._events[event] = [] unless next?

    detach = (next) =>
      index = self._events[event].indexOf next
      if index != -1
        self._events[event].splice index, 1
        detach next
    detach next
  self
