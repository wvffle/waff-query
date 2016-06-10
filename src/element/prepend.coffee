Element::prepend = (element) ->
  if @firstChild?
    @insertBefore element, @firstChild
  else
    @append element
  @
