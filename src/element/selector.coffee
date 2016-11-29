waff.__prop Element::, 'selector',
  configurable: true
  ###*
  # @function Element#selector
  # @typicalname Element#selector
  # @desc Get selector of an element
  # @example
  # waff.query('body').selector // body
  ###
  get: ->
    tn = @tagName.toLowerCase()
    sel = if tn == 'div' then '' else tn
    sel += @id if @id?
    for c in @className.split ' '
      sel += '.' + c unless c == ''
    for k, v of @attr()
      if k != 'id' and k != 'class'
        if v?
          sel += "[#{k}=\"#{v}\"]"
        else
          sel += "[#{k}]"
    sel
  set: ->
    @
