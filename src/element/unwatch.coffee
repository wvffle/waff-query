###*
# @function
# @typicalname Element#unwatch
# @desc Stops observing for DOM changes
# @example
# var element = waff.query('span.red')
# element.watch()
# element.unwatch()
###
Element::unwatch = ->
  if @_observer?
    @_observer.disconnect()
    @_observer = null
  @

Array::unwatch = ->
  for element in @
    if element instanceof Element
      element.unwatch.apply element, arguments
  @
