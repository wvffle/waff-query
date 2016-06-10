Element::text = (text) ->
  unless text?
    return @textContent
  for node in @childNodes
    node.remove()
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
