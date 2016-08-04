###*
# @function
# @typicalname Element.prototype.html
# @desc Sets text of Element to the given string
# @param {String} [html] - html string to set
# @example
# var span = waff.element('span')
# span.html('<div></div>')
# span.html() // <div></div> as a string
###
Element::html = (html) ->
  unless html?
    return @innerHTML

  for node in @childNodes
    node.remove()

  if html instanceof Element
    @append html
    return @

  if html instanceof NodeList or html instanceof Array
    arr = [].slice.call html
    for h in arr
      if h instanceof Element or h instanceof Text
        @append h
    return @
  html = html.get() if html instanceof Text
  @innerHTML = html
  @
