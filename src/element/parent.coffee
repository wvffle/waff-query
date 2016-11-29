###*
# @function
# @typicalname Element#parent
# @desc Get parent element
# @example
# waff.query('body').parent // html
###
waff.__prop Element::, 'parent',
  configurable: true
  get: ->
    return @parentNode if @parentNode instanceof Element
    @parentElement

  set: (parent) ->
    parent.append @ if parent instanceof Element
    @
