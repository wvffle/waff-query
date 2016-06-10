Element::qq = (qs) ->
  waff.qq qs, @
Element::q = (qs) ->
  waff.q qs, @

Element::query = Element::q

Element::query.all = Element::qq
Element::q.all = Element::qq
