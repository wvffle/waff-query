(->
  ###*
  # @func waff#query.all
  # @alias waff#q.all
  # @alias waff#qq
  # @desc Query all elements
  # @param {String|String[]} qs - Query Selector. Default: body
  # @param {Element|Array|NodeList} [root] - Element to perform query on
  # @param {Boolean} [single] - Specifies if the query is single. Default: false
  # @example
  # var divs = waff.query.all('div')
  # var divs = waff.qq('div')
  # var divs = waff.q.all('div')
  # @returns {Element[]} - Returns found elements
  ###
  queryAll = (qs = 'body', root, single = false) ->

    qs = '*' if qs == ''

    query = (qs, root) ->
      if single == true then [ root.querySelector qs ] else root.querySelectorAll qs

    if root instanceof Array or root instanceof NodeList
      s = @ps qs
      arr = [].slice.call root
      ret = []
      for element in arr
        pass = true
        if element instanceof Element
          if pass == true and s.tag != false and element.tagName.toLowerCase() != s.tag.toLowerCase()
            pass = false
          if pass == true and s.id != false and element.id != s.id
            pass = false
          if pass == true
            for c in s.classList
              unless element.classList.contains c
                pass = false
          if pass == true
            ret.push element
      return ret
    return [ qs ] if qs instanceof Element

    root = if root instanceof Element then root else document

    if qs instanceof NodeList or qs instanceof Array
      arr = [].slice.call qs
      _arr = []
      for qs in arr
        if qs instanceof Element
          _arr.push qs
        else
          _arr.push.apply _arr, query qs, root
      arr = _arr
    else
      arr = [].slice.call query qs, root
    ret = []

    for element in arr
      if element instanceof Element
        ret.push element
    ret
  queryAll
)()
