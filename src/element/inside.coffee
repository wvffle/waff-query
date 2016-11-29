###*
# @function
# @typicalname Element#inside
# @desc Checks if element is inside another one
# @param {Element} element - Potential parent
# @example
# q('body').inside(q('html')) // true
###
Element::inside = (parent) ->
  return true if @ == parent
  n = @
  while (n = n.parentNode)?
    return true if n == parent
  false
