(->
  ###*
  # @func waff#element
  # @alias waff#e
  # @desc Creates element with CSS selector
  # @param {String} selector - CSS Selector
  # @example
  # waff.element('.white-text')
  # @returns {Element} Returns new element
  ###
  create = (cs) ->
    s = @ps cs
    el = document.createElement s.tag or 'div'
    el.id = s.id if s.id
    for c in s.class
      el.class.add c
    if s.attr
      for attr, parsed of s.attr
        if parsed.operator == '='
          el.attr attr, parsed.value
    el
  create
)()
