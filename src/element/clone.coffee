###*
# @function
# @typicalname Element#clone
# @desc Clones element
# @param {Boolean} [deep=false] - Deep clone
# @example
# waff.query('body').clone()
###
Element::clone = (deep = false) ->
  clone = @cloneNode deep
  clone.original = @
  clone
