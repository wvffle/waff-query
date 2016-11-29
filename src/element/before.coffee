###*
# @function
# @typicalname Element#before
# @desc Adds element before
# @param {Element} element - Next element
# @example
# var span = waff.element('span.red')
# var div = waff.element('div')
# waff.query('body').append(span)
# div.before(span)
# // body
# //   div
# //   span.red
###
Element::before = (element) ->
  if element.parent?
    element.parent.insertBefore @, element
  @
