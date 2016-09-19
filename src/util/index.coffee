do ->
  index = (arr, target) ->
    for subject, i in arr
      return i if subject == target
    -1
  index
