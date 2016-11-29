(->
  ###*
  # @func waff#element
  # @alias waff#e
  # @desc Creates element with CSS selector
  # @param {String} selector - CSS Selector
  # @param {Object} [attrs] - Element attributes
  # @param {Element[]} [children] - Element children
  # @example
  # waff.element('.white-text')
  #
  # waff.element('script', { src: 'https://...' })
  #
  # waff.element('.meh', [
  #   waff.element('span', [ waff.text('meh.') ])
  # ])
  # @returns {Element} Returns new element
  ###
  create = (cs, attrs, children) ->
    s = @ps cs
    el = document.createElement s.tag or 'div'
    el.id = s.id if s.id
    for c in s.class
      el.class.add c
    if s.attr
      for attr, parsed of s.attr
        if parsed.operator == '='
          el.attr attr, parsed.value
    if waff.__isarray attrs
      children = attrs
    if attrs?
      if waff.__isobject attrs
        el.attr attrs
    if children?
        for child in children
          if child instanceof Element or child instanceof Text
            el.append child

    el
  create
)()
