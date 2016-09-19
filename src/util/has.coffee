do ->
  has = (arr, element) ->
    for el, i in arr
      return true if el == element
    false
  has
