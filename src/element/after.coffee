###*
# @function
# @typicalname Element#after
# @desc Adds element after
# @param {Element} element - Previous element
# @example
# var span = waff.element('span.red')
# var div = waff.element('div')
# waff.query('body').append(span)
# div.after(span)
# // body
# //   span.red
# //   div
###
Element::after = (element) ->
  if element.parent?
    if element.nextSibling?
      element.parent.insertBefore @, element.nextSibling
    else
      element.parent.append @
  @
