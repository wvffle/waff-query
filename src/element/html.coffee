###*
# @function
# @typicalname Element#html
# @desc Sets text of Element to the given string or returns html string
# @param {String} [html] - Html string to set
# @example
# var span = waff.element('span')
# span.html('<div></div>')
# span.html() // <div></div> as a string
###
Element::html = (html) ->
  unless html?
    return @innerHTML

  @clear()

  if html instanceof Element
    @append html
    return @

  if html instanceof NodeList or waff.__isarray html
    arr = waff.__toarray html
    for h in arr
      if h instanceof Element or h instanceof Text
        @append h
    return @
  html = html.get() if html instanceof Text
  @innerHTML = html
  @

Array::html = ->
  for element in @
    if element instanceof Element
      element.html.apply element, arguments
  @
