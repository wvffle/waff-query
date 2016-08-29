###*
# @function
# @typicalname Element.prototype.clear
# @desc Clears element content
# @example
# waff.element('body').clear()
###
Element::clear = ->
  while @childNodes.length > 0
    @firstChild.remove()
  @

Array::clear = ->
  for element in @
    if element instanceof Element
      element.clear.apply element, arguments
  @
