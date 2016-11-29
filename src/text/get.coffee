###*
# @function
# @typicalname Text#get
# @desc Gets nodeValue
# @example
# var text = waff.text('The number of a waffle')
# text.get() // The number of a waffle
###
Text::get = ->
  @nodeValue
