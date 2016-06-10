Event.extend = (object)->
  emitter = object._emitter = e()
  object.on = emitter.on.bind {emitter: emitter, obj: object} unless object.on?
  object.once = emitter.once.bind {emitter: emitter, obj: object} unless object.once?
  object.off = emitter.off.bind {emitter: emitter, obj: object} unless object.off?
  object.dispatchEvent = emitter.dispatchEvent.bind emitter unless object.dispatchEvent?
  object.emit = emitter.emit.bind {emitter: emitter, obj: object} unless object.emit?
  object
