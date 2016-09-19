###*
# @function
# @name Element#query
# @desc Query single element
# @param {String} selector='body' - CSS Selector
# @example
# var nav = document.body.query('nav')
# @returns {Element|null} Returns found element or null
###
Element::q = (qs) ->
  waff.q qs, @
###*
# @function
# @name Element#query.all
# @desc Query single element
# @param {String} selector='body' - CSS Selector
# @example
# var divs = document.body.query.all('div')
# @returns {Element[]} Returns found elements
###
Element::qq = (qs) ->
  waff.qq qs, @

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
