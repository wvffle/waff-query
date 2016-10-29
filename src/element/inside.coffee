###*
# @function
# @typicalname Element#inside
# @desc Checks if element is inside another one
# @param {Element} element - Potential parent
# @example
# q('body').inside(q('html')) // true
###
Element::inside = (parent) ->
  n = @parentNode
  until n == parent
    return false if (n = @parentNode) == document
  true
