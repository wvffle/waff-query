(->
  ###*
  # @func waff.query
  # @desc Query single elemnt
  # @param {String} qs - Query Selector
  # @param {Element} [root] - Element to perform query on
  ###
  query = (qs, root) ->
    @qq(qs, root)[0] or null

  query
)()
