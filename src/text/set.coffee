###*
# @function
# @typicalname Text#set
# @desc Sets nodeValue
# @example
# var text = waff.text('The number of a waffle')
# text.set('666')
# text.get() // 666 as a string
###
Text::set = (text) ->
  @nodeValue = text
  @
