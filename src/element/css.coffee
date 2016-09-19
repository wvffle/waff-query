###*
# @function
# @typicalname Element#css
# @desc Gets or sets  elements CSS
# @param {String|Object} attr - Attribute name or object with values
# @param {String} [value] - Attribute value
# @example
# // Object containing all properties
# waff.element('body').css()
#
# // Only `background-color`
# waff.element('body').css('background-color')
#
# // sets `background-color` to #f00
# waff.element('body').css('background-color', '#f00')
#
# // sets `background-color` to #f00 and `color` to #ffa500
# // (supports camelcase and kebabcase)
# waff.element('body').css({backgroundColor: '#f00', 'color', '#ffa500'})
###
Element::css = (css, values) ->
  camel = (str) ->
    str.replace /(\-[a-z])/g, (m) ->
      m.toUpperCase().slice 1
  kebab = (str) ->
    str.replace /([A-Z])/g, (m) ->
      "-" + m.toLowerCase()

  trbl = (prop, suf = '') ->
    prop = camel prop
    [prop+suf, prop+'Top'+suf, prop+'Bottom'+suf, prop+'Left'+suf, prop+'Right'+suf]
  knownProps = [
    'width'
    'height'
    'lineHeight'
    'fontSize'
    'textIndent'
    'top'
    'left'
    'right'
    'bottom'
    'wordSpacing'
  ]
  [].push.apply knownProps, trbl 'margin'
  [].push.apply knownProps, trbl 'padding'
  [].push.apply knownProps, trbl 'border', 'Width'


  if typeof css == 'string'
    unless values?
      return @css()[camel css] || @css()[kebab css]
    @style[camel css] = values
  if typeof css == 'object'
    for prop, style of css
      prop = camel prop
      style += 'px' unless (isNaN +style) or -1 == waff.__index knownProps, prop
      @style[prop] = style
    return @
  unless css?
    css = getComputedStyle @
    res = {}
    for prop, style of css
      if isNaN +prop
        res[prop] = style
    # safari 5.1
    if res.color == undefined
      text = res.cssText
      res = {}
      props = text.split ';'
      for prop in props
        rule = prop.split ':'
        res[rule[0].replace /^\s+|\s+$/, ''] = rule[1].replace /^\s+|\s+$/, '' unless rule[1] == undefined
		res

Array::css = ->
  for element in @
    if element instanceof Element
      element.css.apply element, arguments
  @
