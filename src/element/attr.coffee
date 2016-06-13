Element::attr = (attr, value) ->
  if typeof attr == 'object'
    for key, val of attr
      @setAttribute key, val
    return @
  else
    if value?
      @setAttribute attr, value
    else
      return @getAttribute attr
  @
