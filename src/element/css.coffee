Element::css = (css, values) ->

  camel = (str) ->
    str.replace /(\-[a-z])/g, (m) ->
      m.toUpperCase().slice 1
  dash = (str) ->
    str.replace /([A-Z])/g, ->
      "-" + m.toLowerCase()

  if typeof css == 'string'
    unless values?
      return @css()[camel css] || @css()[dash css]
    @style[camel css] = values
  if typeof css == 'object'
    for prop, style of css
   		@style[camel prop] = style
    return @
  unless css?
    css = getComputedStyle @
    res = {}
    for prop, style of css
      if isNaN +prop
        res[prop] = style
		res
