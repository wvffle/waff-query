###*
# @function
# @typicalname Element.prototype.after
# @desc Adds element after
# @param {Element} element - element to add
# @example
# var span = waff.element('span.red')
# var div = waff.element('div')
# waff.query('body').append(span)
# div.after(span)
# // body
# //   span.red
# //   div
###
Element::after = ->
  for element in arguments
    if element.parentElement
      if @nextSibling?
        element.parentElement.insertBefore @, element.nextSibling
      else
        element.parentElement.append @
  @
