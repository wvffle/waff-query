(->
  ###*
  # @func waff#query
  # @alias waff#q
  # @desc Query single element
  # @param {String} qs - Query Selector
  # @param {Element|Array|NodeList} [root] - Element to perform query on
  # @example
  # var body = waff.query('body')
  # var body = waff.q('body')
  # @returns {Element|null} - Returns found element or null
  ###
  query = (qs, root) ->
    @qq(qs, root)[0] or null

  query
)()
