###*
# @function
# @typicalname Element#attr
# @desc Gets or sets attributes of element
# @param {String|Object} attr - Attribute name or object with values
# @param {String} [value] - Attribute value
# @example
# var span = waff.element('span.red')
# span.attr('name', 'waffles!')
# span.attr({'name': 'waffles!', 'sth': true})
###
Element::attr = (attr, value) ->
  if typeof attr == 'object'
    for key, val of attr
      @attr key, val
    return @
  else
    if value?
      @setAttribute attr, value
    else if value == null
      @removeAttribute attr
    else
      return @getAttribute attr
  @

Array::attr = ->
  for element in @
    if element instanceof Element
      element.attr.apply element, arguments
  @
