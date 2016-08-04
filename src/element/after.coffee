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
Element::after = (element) ->
  return unless @parentElement
  if @nextSibling?
    @parentElement.insertBefore element, @nextSibling
  else
    @parentElement.append element
  @
