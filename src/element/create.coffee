(selector) ->
  s = @ps selector
  el = document.createElement s.tag or 'div'
  el.id = s.id if s.id
  for c in s.classList
    el.classList.add c
  el
