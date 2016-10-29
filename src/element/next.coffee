###*
# @function
# @typicalname Element#next
# @desc Get next element
# @example
# waff.query('head').next // body
###
waff.__prop Element::, 'next',
  configurable: true
  get: ->
    @nextElementSibling

  set: (element) ->
    element.after @
    @
