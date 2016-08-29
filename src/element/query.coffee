Element::qq = (qs) ->
  waff.qq qs, @
Element::q = (qs) ->
  waff.q qs, @

Element::query = Element::q

Element::query.all = Element::qq
Element::q.all = Element::qq


Array::q = (qs) ->
  waff.q qs, @
Array::qq = (qs) ->
  waff.qq qs, @

Array::query = Array::q

Array::query.all = Array::qq
Array::q.all = Array::qq
