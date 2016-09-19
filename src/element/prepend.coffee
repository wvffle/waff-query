###*
# @function
# @typicalname Element#prepend
# @desc Adds element at the beginning
# @param {Element|Element[]} ...element - Element to prepend
# @example
# var span = waff.element('span.red')
# var body = waff.query('body')
# body.prepend(span)
# // body
# //   span.red
# //   <content>
#
# var span = waff.element('span.orange')
# var span2 = waff.element('span.red')
# var body = waff.query('body')
# body.prepend(span, span2)
# // body
# //   span.orange
# //   span.red
# //   <content>
#
# var span = waff.element('span.orange')
# var span2 = waff.element('span.red')
# var body = waff.query('body')
# body.prepend([span, span2])
# // body
# //   span.orange
# //   span.red
# //   <content>
###
Element::prepend = ->
  for element in arguments by -1
    if waff.__isarray element
      for el in waff.__toarray element by -1
        if @firstChild?
          @insertBefore el, @firstChild
        else
          @append el
    else
      if @firstChild?
        @insertBefore element, @firstChild
      else
        @append element
  @
