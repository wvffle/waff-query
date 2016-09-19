opts =
  configurable: true
  ###*
  # @function Element#classes
  # @instance
  # @typicalname Element#classese
  # @desc custom class list
  ###
  get: ->
    cn = @className.split ' '
    target: @
    ###*
    # @function Element#classes#has
    # @desc Checks if element has class or classes
    # @returns Boolean
    # @param {String|Array} class - class to check
    # @param {String} [...class] - classes to check
    # @example
    # waff.query('body').class.has('cls')
    # waff.query('body').class.has('cls', 'cls2')
    # waff.query('body').class.has(['cls', 'cls2'])
    ###
    has: (c) ->
      for cl in arguments
        if typeof cl == 'string'
          return false unless waff.__has cn, cl
        else
          for cl2 in waff.__toarray cl
            return false unless @has cn, cl2
      true
    ###*
    # @function Element#classes#add
    # @desc Adds class or classes
    # @param {String|Array} class - class to add
    # @param {String} [...class] - classes to add
    # @returns {Element#classes} instance
    # @example
    # waff.query('body').class.add('cls')
    # waff.query('body').class.add('cls', 'cls2')
    # waff.query('body').class.add(['cls', 'cls2'])
    ###
    add: (c) ->
      for cl in arguments
        if typeof cl == 'string'
          unless cl == '' or waff.__has cn, cl
            cn.push cl
            c = cn.join ' '
            while c[0] == ' '
              c = c.slice 1
            @target.className = c
        else
          for cl2 in waff.__toarray cl
            unless cl2 == '' or waff.__has cn, cl2
              cn.push cl2
              c = cn.join ' '
              while c[0] == ' '
                c = c.slice 1
              @target.className = c
      @
    ###*
    # @function Element#classes#remove
    # @desc Removes class or classes
    # @param {String|Array} class - class to remove
    # @param {String} [...class] - classes to remove
    # @returns {Element#classes} instance
    # @example
    # waff.query('body').class.remove('cls')
    # waff.query('body').class.remove('cls', 'cls2')
    # waff.query('body').class.remove(['cls', 'cls2'])
    ###
    remove: (c) ->
      for cl in arguments
        if typeof cl == 'string'
          if cl != '' and waff.__has cn, cl
            until -1 == (i = waff.__index cn, cl)
              cn.splice i, 1
              c = cn.join ' '
              while c[0] == ' '
                c = c.slice 1
            @target.className = c
        else
          for cl2 in waff.__toarray cl
            if cl != '' and waff.__has cn, cl2
              until -1 == (i = waff.__index cn, cl2)
                cn.splice i, 1
                c = cn.join ' '
                while c[0] == ' '
                  c = c.slice 1
              @target.className = c

      @
    ###*
    # @function Element#classes#toggle
    # @desc Toggles class or classes
    # @param {String|Array} class - class to toggle
    # @param {String} [...class] - classes to toggle
    # @returns {Element#classes} instance
    # @example
    # waff.query('body').class.toggle('cls')
    # waff.query('body').class.toggle('cls', 'cls2')
    # waff.query('body').class.toggle(['cls', 'cls2'])
    ###
    toggle: (c) ->
        for cl in arguments
          if typeof cl == 'string'
            if waff.__has cn, cl
              @remove cl
            else
              @add cl
          else
            for cl2 in waff.__toarray cl
              if waff.__has cn, cl2
                @remove cl2
              else
                @add cl2
  set: (c) ->
    for cl in arguments
      if typeof cl == 'string'
        @className = cl
      else if waff.__isarray cl
        @className = (waff.__toarray cl).join ' '
waff.__prop Element::, 'class', opts
waff.__prop Element::, 'classes', opts

arropts =
  configurable: true
  get: ->
    add: ->
      for element in @
        if waff.__isarray element
          for el in element
            el.class.add.apply el, arguments
        else
          element.class.add.apply element, arguments
    remove: ->
      for element in @
        if waff.__isarray element
          for el in element
            el.class.remove.apply el, arguments
        else
          element.class.remove.apply element, arguments
    toggle: ->
      for element in @
        if waff.__isarray element
          for el in element
            el.class.toggle.apply el, arguments
        else
          element.class.toggle.apply element, arguments
  set: ->
    for element in @
      if waff.__isarray element
        for el in element
          el.class = arguments
      else
        element.class = arguments

waff.__prop Array::, 'class', arropts
waff.__prop Array::, 'classes', arropts
