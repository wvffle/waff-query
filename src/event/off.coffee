for Target in waff._EventTargets
  Target::off = (name, next, capture) ->
    unless waff.__isarray name
      name = [ name ]

    self = if @emitter? then @emitter else @
    self._events = {} unless self._events?

    for event in name
      self._events[event] = [] unless self._events[event]?
      self._events[event] = [] unless next?

      detach = (next) =>
        index = waff.__index self._events[event], next
        unless index == -1
          self._events[event].splice index, 1
          detach next
      detach next
    self
