for Target in waff._EventTargets
  Target::once = (name, next, capture) ->
    unless waff.__isarray name
      name = [ name ]

    self = if @emitter? then @emitter else @
    _this = if @emitter? then @obj else @

    for event in name
      ((event)->
        n = (ev) ->
          next.call _this, ev
          self.off event, n, capture

        self.on event, n, capture
      )(event)

    self
