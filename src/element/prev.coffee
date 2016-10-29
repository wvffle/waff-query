###*
# @function
# @typicalname Element#prev
# @desc Get previous element
# @example
# waff.query('body').prev // head
###
waff.__prop Element::, 'prev',
  configurable: true
  get: ->
    @previousElementSibling

  set: (element) ->
    element.before @
    @
