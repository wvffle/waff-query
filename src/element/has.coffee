###*
# @function
# @typicalname Element#has
# @desc Checks if element has another one
# @param {Element} element - Potential parent
# @example
# q('html').has(q('body')) // true
###
Element::has = (child) ->
  child.inside @
