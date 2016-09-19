###*
# @function
# @typicalname Element#text
# @desc Sets text of Element to the given string or returns text string
# @param {String} [text] - Text to set
# @example
# var span = waff.element('span')
# span.text('<div></div>')
# span.text() // <div></div> as a string
###
Element::text = (text) ->
  unless text?
    return @textContent

  content = not (@childNodes.length == 1 and @childNodes[0] instanceof Text)
  @clear() if content

  if waff.__isarray text
    _text = ''
    for t in waff.__toarray text
      if t instanceof Text
        _text += t.get()
      else
        if typeof t == 'string'
          _text += t
        else
          _text += t.toString()
    unless content
      return @childNodes[0].set _text
    else
      e = waff.t _text
      @append e
      return e
  text = text.get() if text instanceof Text
  unless content
    @childNodes[0].set text
  else
    e = waff.t text
    @append e
    e

Array::text = ->
  for element in @
    if element instanceof Element
      element.text.apply element, arguments
  @
