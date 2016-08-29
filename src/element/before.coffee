###*
# @function
# @typicalname Element.prototype.before
# @desc Adds element before
# @param {Element} element - element to add
# @example
# var span = waff.element('span.red')
# var div = waff.element('div')
# waff.query('body').append(span)
# div.before(span)
# // body
# //   div
# //   span.red
###
Element::before = ->
  for element in arguments
    if element.parentElement
      element.parentElement.insertBefore @, element
  @
