###*
# @function
# @typicalname Element.prototype.class
# @desc classList shortcut
# @example
# waff.element('body').class.contains('cls')
# waff.element('body').class.remove('cls')
# waff.element('body').class.add('cls')
# waff.element('body').class.toggle('cls')
###
Object.defineProperty Element::, 'class',
  configurable: true
  get: ->
    @classList
  set: ->
    @classList
