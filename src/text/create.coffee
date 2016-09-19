(->
  ###*
  # @func waff#text
  # @alias waff#t
  # @desc Creates TextNode
  # @param {String} str - Text
  # @example
  # var text = waff.text('The number of a waffle')
  # text.set('<div></div>')
  # text.get() // &lt;div&gt;&lt;/div&gt;
  # @returns {TextNode} Returns new TextNode
  ###
  text = (t) ->
     document.createTextNode t
  text
)()
