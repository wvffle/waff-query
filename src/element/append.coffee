###*
# @function
# @typicalname Element#append
# @desc Adds element at the end
# @param {Element|Element[]} ...element - Element to append
# @example
# var span = waff.element('span.red')
# var body = waff.query('body')
# body.append(span)
# // body
# //   <content>
# //   span.red
#
# var span = waff.element('span.orange')
# var span2 = waff.element('span.red')
# var body = waff.query('body')
# body.append(span, span2)
# // body
# //   <content>
# //   span.orange
# //   span.red
#
# var span = waff.element('span.orange')
# var span2 = waff.element('span.red')
# var body = waff.query('body')
# body.append([span, span2])
# // body
# //   <content>
# //   span.orange
# //   span.red
###
Element::append = ->
  for element in arguments
    if waff.__isarray element
      for el in waff.__toarray element
        @appendChild element
    else
      @appendChild element
  @
