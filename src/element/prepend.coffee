###*
# @function
# @typicalname Element.prototype.prepend
# @desc Adds element at the beginning
# @param {Element} element - element to prepend
# @example
# var span = waff.element('span.red')
# var body = waff.element('body')
# body.prepend(span)
# // body
# //   span.red
# //   <content>
###
Element::prepend = (element) ->
  if @firstChild?
    @insertBefore element, @firstChild
  else
    @append element
  @
