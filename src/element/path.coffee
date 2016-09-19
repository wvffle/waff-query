waff.__prop Element::, 'path',
  configurable: true
  ###*
  # @function Element#path
  # @typicalname Element#path
  # @desc Get unique path of an element
  # @example
  # waff.query('body').path() // html > body:nth-child(2)
  ###
  get: ->
    root = @
    path = []
    while root.parentNode
      if root.id != ''
        path.unshift '#' + root.id
        break
      if root == waff.q 'html'
        path.unshift root.tagName.toLowerCase()
      else
        i = 1
        e = root
        while e.previousElementSibling
          e = e.previousElementSibling
          i++

        # TODO:
        # Add classes from root.classList

        path.unshift root.tagName.toLowerCase() + ':nth-child(' + i + ')'
      root = root.parentNode
    path.join ' > '
  set: ->
    @
