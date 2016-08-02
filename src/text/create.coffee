(->
  ###*
  # @func waff#text
  # @alias waff#t
  # @desc Creates TextNode
  # @param {String} t - Text
  # @example
  # // AMD users
  # waff.text('.white-text')
  # // Non AMD users
  # text('.white-text')
  # @returns {TextNode} - Returns new TextNode
  ###
  text = (t) ->
     document.createTextNode t
  text
)()
