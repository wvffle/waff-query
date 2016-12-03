(->
  ###*
  # @func waff#query
  # @alias waff#q
  # @desc Query single element
  # @param {String} selector='body' - CSS Selector
  # @param {Element} [root=document] - Element to perform query on
  # @example
  # var body = waff.query('body')
  # var body = waff.q('body')
  # @returns {Element|null} Returns found element or null
  ###
  query = (qs, root) ->
    @qq(qs, root, true, true) or null

  query
)()
