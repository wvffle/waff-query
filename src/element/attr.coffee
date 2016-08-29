###*
# @function
# @typicalname Element.prototype.attr
# @desc Sets attributes of element
# @param {String|Object} attr - attribute name or object with values
# @param {String} [value] - attribute value
# @example
# var span = waff.element('span.red')
# span.attr('name', 'waffles!')
# span.attr({'name': 'waffles!', 'sth': true})
###
Element::attr = (attr, value) ->
  if typeof attr == 'object'
    for key, val of attr
      @setAttribute key, val
    return @
  else
    if value?
      @setAttribute attr, value
    else
      return @getAttribute attr
  @

Array::attr = ->
  for element in @
    if element instanceof Element
      element.attr.apply element, arguments
  @
