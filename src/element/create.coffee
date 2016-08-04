(->
  ###*
  # @func waff#element
  # @alias waff#e
  # @desc Creates element by CSS selector
  # @param {String} cs - CSS Selector
  # @example
  # waff.element('.white-text')
  # @returns {Element} - Returns new element
  ###
  create = (cs) ->
    s = @ps cs
    el = document.createElement s.tag or 'div'
    el.id = s.id if s.id
    for c in s.classList
      el.classList.add c
    el
  create
)()
