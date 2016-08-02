(->
  ###*
  # @func waff#query#all
  # @alias waff#q#all
  # @alias waff#qq
  # @desc Query all elemnt
  # @param {String} qs - Query Selector
  # @param {Element|Array|NodeList} [root] - Element to perform query on
  # @example
  # // AMD users
  # waff.query.all('body')
  # // Non AMD users
  # query.all('body')
  # @returns {Element[]} - Returns found elements
  ###
  queryAll = (qs, root) ->
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
    else
      arr = [].slice.call root.querySelectorAll qs
    ret = []

    for element in arr
      if element instanceof Element
        ret.push element
    ret
  queryAll
)()
