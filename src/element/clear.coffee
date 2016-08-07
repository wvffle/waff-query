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
