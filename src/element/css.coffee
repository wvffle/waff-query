###*
# @function
# @typicalname Element.prototype.css
# @desc Get or set  elements CSS
# @param {String|Object} attr - attribute name or object with values
# @param {String} [value] - attribute value
# @example
# waff.element('body').css() // Object containing all properties
# waff.element('body').css('background-color') // Only `background-color`
# waff.element('body').css('background-color', '#f00') // sets `background-color` to #f00
# waff.element('body').css({'background-color': '#f00', 'color', '#ffa500'}) // sets `background-color` to #f00 and `color` to #ffa500
###
Element::css = (css, values) ->
  camel = (str) ->
    str.replace /(\-[a-z])/g, (m) ->
      m.toUpperCase().slice 1
  dash = (str) ->
    str.replace /([A-Z])/g, (m) ->
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

Array::css = ->
  for element in @
    if element instanceof Element
      element.css.apply element, arguments
  @
