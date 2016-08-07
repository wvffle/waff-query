###*
# @function
# @typicalname Element.prototype.text
# @desc Sets text of Element to the given string
# @param {String} [text] - text to set
# @example
# var span = waff.element('span')
# span.text('<div></div>')
# span.text() // <div></div> as a string
###
Element::text = (text) ->
  unless text?
    return @textContent

  while @childNodes.length > 0
    @firstChild.remove()

  if text instanceof NodeList or text instanceof Array
    _text = ''
    for t in [].slice.call text
      if t instanceof Text
        _text += t.get()
      else
        if typeof t == 'string'
          _text += t
        else
          _text += t.toString()
    e = waff.t _text
    @append e
    return e
  text = text.get() if text instanceof Text
  e = waff.t text
  @append e
  e
