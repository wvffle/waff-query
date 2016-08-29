
###*
# @function
# @typicalname Element.prototype.unwatch
# @desc Stops observing for DOM changes
# @example
# var element = waff.query('span.red')
# element.watch()
# element.unwatch()
###
Element::unwatch = ->
  if @_observer?
    @_observer.disconnect()
    delete @_observer
  @

Array::unwatch = ->
  for element in @
    if element instanceof Element
      element.unwatch.apply element, arguments
  @
