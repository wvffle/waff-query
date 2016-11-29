(->
  ###*
  # @func waff#query.all
  # @alias waff#q.all
  # @alias waff#qq
  # @desc Query all elements
  # @param {String} selector='body' - CSS Selector
  # @param {Element} [root=document] - Element to perform query on
  # @param {Boolean} [single=false] - Specifies if the query is single
  # @example
  # var divs = waff.query.all('div')
  # var divs = waff.qq('div')
  # var divs = waff.q.all('div')
  # @returns {Element[]} Returns found elements
  ###
  querySelector = (qs, root, single) ->
    [root.querySelector qs] if single == true
    root.querySelectorAll qs
  queryElement = (qs, root, single) ->
    if waff.__has qs, '['
      querySelector qs, root, single
    else if /^[A-z0-9*-]+$/.test qs
      root.getElementsByTagName qs
    else if /^#[A-z0-9*-]+$/.test qs
      [document.getElementById qs.slice 1]
    else if /^\.[A-z0-9*-.]+$/.test qs
      root.getElementsByClassName (qs.replace /\./g, ' ').slice 1
    else
      querySelector qs, root, single
  queryAll = (qs = 'body', root = document, single = false) ->
    qs = '*' if qs == ''

    if waff.__isarray root
      s = @ps qs
      arr = waff.__toarray root
      ret = []
      _arr = []
      for element in arr
        if element instanceof Element
          _arr.push element
      arr = _arr
      if s.tag == '*'
        if single == true
          return arr[0]
        else
          return arr
      for element in arr
        pass = true
        if pass == true and s.tag != false and element.tagName.toLowerCase() != s.tag.toLowerCase()
          pass = false
        if pass == true and s.id != false and element.id != s.id
          pass = false
        if pass == true
          for c in s.class
            unless element.class.has c
              pass = false
        if pass == true and s.attr != false
          for attr, parsed of s.attr
            if pass == true
              switch parsed.operator
                when false
                  pass = element.hasAttribute attr
                when '='
                  pass = parsed.value == element.attr attr
                when '^='
                  pass = 0 == waff.__index element.attr(attr), parsed.value
                when '$='
                  v = element.attr attr
                  pass = -1 != v.indexOf parsed.value, v.length - parsed.value
                when '~='
                  pass = -1 != waff.__index element.attr(attr).split(' '), parsed.value
                when '|='
                  v = element.attr attr
                  pass = parsed.value == v
                  unless pass == true
                    pass = 0 == waff.__index v, parsed.value + '-'
                when '*='
                  pass = -1 != waff.__index element.attr(attr), parsed.value
        if pass == true
          if single == true
            return element
          ret.push element

      return ret
    if qs instanceof Element
      return if single == true then qs else [ qs ] 
    if waff.__isarray qs
      arr = waff.__toarray qs
      _arr = []
      for qs, i in arr
        if qs instanceof Element
          return qs if single == true
          _arr.push qs
        else
          q = queryElement qs, root, single
          return q[0] if single == true
          _arr.push.apply _arr, q
      _arr
    else
      if single == true
        queryElement(qs, root, single)[0]
      else
        waff.__toarray queryElement qs, root, single
  queryAll
)()
