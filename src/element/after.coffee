Element::after = (element) ->
  return unless @parentElement
  if @nextSibling?
    @parentElement.insertBefore element, @nextSibling
  else
    @parentElement.append element
  @
