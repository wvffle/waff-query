(->
  ###*
  # @func waff#query
  # @alias waff#q
  # @desc Query single elemnt
  # @param {String} qs - Query Selector
  # @param {Element} [root] - Element to perform query on
  # @example
  # // returns body element
  # waff.query('body')
  # @returns {Element|null} - Returns found element or null
  # @playground
  ###
  query = (qs, root) ->
    @qq(qs, root)[0] or null

  query
)()
