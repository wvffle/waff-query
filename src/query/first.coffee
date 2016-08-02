(->
  ###*
  # @func waff#query
  # @alias waff#q
  # @desc Query single elemnt
  # @param {String} qs - Query Selector
  # @param {Element|Array|NodeList} [root] - Element to perform query on
  # @example
  # // AMD users
  # waff.query('body')
  # // Non AMD users
  # query('body')
  # @returns {Element|null} - Returns found element or null
  ###
  query = (qs, root) ->
    @qq(qs, root)[0] or null

  query
)()
