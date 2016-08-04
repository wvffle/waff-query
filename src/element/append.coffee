###*
# @function
# @typicalname Element.prototype.append
# @desc Adds element at the end
# @param {Element} element - element to append
# @example
# var span = waff.element('span.red')
# var body = waff.element('body')
# body.append(span
# // body
# //   <content>
# //   span.red
###
Element::append = (element) ->
  @appendChild element
  @
