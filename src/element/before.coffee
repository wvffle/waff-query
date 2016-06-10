Element::before = (element) ->
  return unless @parentElement
  @parentElement.insertBefore element, @
  @
