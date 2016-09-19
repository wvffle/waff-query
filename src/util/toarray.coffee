do ->
  toarray = (arr) ->
    a = []
    Array::push.apply a, arr
    a
  toarray
