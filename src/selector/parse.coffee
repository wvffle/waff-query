(->
  ###*
  # @func waff#selector.parse
  # @alias waff#ps
  # @desc Parse CSS selectors
  # @param {String} cs - CSS Selector
  # @example
  # selector.parse('div#header.white-text')
  # //  {
  # //    tag: 'div',
  # //    id: 'header',
  # //    class: [ 'white-text' ]
  # //  }
  # @returns {Object} - Returns parsed selector
  ###

  parseSelector = (cs) ->
    tag = false
    id = false
    at = false
    selector = cs or ''
    sel = ''
    atr = ''
    parseAttr = (res) ->
      res = res.slice 1, -1
      cs = -1 != res.indexOf ' i', res.length - 2
      op = false
      res = res.slice 0, -2 if cs
      vel = {}
      last = ''
      str = ''
      return if res == ''
      for char in res
        unless vel.op?
          unless -1 == waff.__index ['=', '|', '*', '^', '$', '~'], char
            vel.op = char
            vel.na = str
            str = ''
            char = ''
        else
          if char == '='
            unless -1 == waff.__index ['|', '*', '^', '$', '~'], vel.op
              vel.op += char
              char = ''
        str += char
        last = char
      unless vel.op? and vel.na?
        vel.na = str
        str = null
      return unless vel.na?
      return if vel.op? and str == ''
      return if vel.op? and vel.na == ''
      at = {} if at == false
      if str? and ((str[0] == '\'' and str[str.length-1] == '\'') or (str[0] == '"' and str[str.length-1] == '"'))
        str = JSON.parse str
      at[vel.na] =
        operator: vel.op or false
        value: str or false
        caseSensitive: cs
    for char in selector
      if char == '['
        atr += char
      else if char == ']'
        atr += char
        parseAttr atr
        atr = ''
      else
        if atr.length == 0
          sel += char
        else
          atr += char
    selector = sel

    cn = selector.split '.'
    tag = cn[0] if selector[0] != '.'
    cn.splice 0, 1
    tag = false if tag == ''
    if tag != false and -1 != waff.__index tag, '#'
      _tag = tag.split '#'
      tag = _tag[0]
      id = _tag[1]
    if id == false
      for c, i in cn
        _id = c.split '#'
        if _id[1]
          id = _id[1]
          cn[i] = _id[0]
          break

    tag: tag
    id: id
    class: cn
    attr: at
  parseSelector
)()
