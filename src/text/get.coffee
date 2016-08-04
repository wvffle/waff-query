###*
# @function
# @typicalname Text.prototype.get
# @desc get nodeValue easier
# @example
# var text = waff.text('The number of a waffle')
# text.get() // The number of a waffle
###
Text::get = ->
  @nodeValue
