Element::css = (css, values) ->
  if typeof css == 'string'
    unless values?
      return @css()[css]
    @style[css] = values
  if typeof css == 'object'
    for prop, style of css
   		@style[prop] = style
    return @
  unless css?
    css = getComputedStyle @
    res = {}
    for prop, style of css
      if isNaN +prop
        res[prop] = style
		res
