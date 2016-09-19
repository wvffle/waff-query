###*
# @function
# @typicalname Element#clear
# @desc Clears element content
# @example
# waff.query('body').clear()
###
Element::clear = ->
  while @childNodes.length > 0
    @removeChild @firstChild
  @

Array::clear = ->
  for element in @
    if element instanceof Element
      element.clear.apply element, arguments
  @
