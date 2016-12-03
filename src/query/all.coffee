do ->
  ###*
  # @func waff#query.all
  # @alias waff#q.all
  # @alias waff#qq
  # @desc Query all elements
  # @param {String} selector='body' - CSS Selector
  # @param {Element} [root=document] - Element to perform query on
  # @param {Boolean} [single=false] - Specifies if the query is single
  # @param {Boolean} [nodelist=false] - Specifies if output is nodelist
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

  queryAll = (qs = 'body', root = document, single = false, nodelist = false) ->
    qs = '*' if qs == ''
    array = if nodelist == true then (e) -> e else waff.__toarray

    if waff.__isarray root
      s = @ps qs
      arr = array root
      ret = []
      _arr = []
      for element in arr
        _arr.push element if element instanceof Element

      arr = _arr
      if s.tag == '*'
        return if single == true then arr[0] else arr

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
          return element if single == true
          ret.push element

      return ret
    if qs instanceof Element
      return if single == true then qs else [ qs ] 
    if waff.__isarray qs
      arr = array qs
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
        array queryElement qs, root, single
  queryAll
