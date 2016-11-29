do ->
  isobject = (obj) ->
    '[object Object]' == Object.prototype.toString.call obj
  isobject
