###
# waff-query v1.0.2
# https://github.com/wvffle/waff-query.js#readme
#
# Copyright wvffle.net
# Released under the MIT license
#
# Date: 2016-08-29
###

((coffeFix, _waff) ->
  if typeof module != 'undefined'
    waff = {}
    for key, value of _waff
      if _waff.hasOwnProperty key
        unless key[0] == '_'
          waff[key] = value
        else
          waff[key.slice 1] = value
    module.exports = waff
  else if typeof define == 'function' and typeof define.amd == 'object'
    define 'waff-query', [], ->
      waff = {}
      for key, value of _waff
        if _waff.hasOwnProperty key
          unless key[0] == '_'
            waff[key] = value
          else
            waff[key.slice 1] = value
      waff
  else
    @waff = _waff
    for key, value of _waff
      if _waff.hasOwnProperty key
        unless key[0] == '_'
          @[key] = value
        else
          @waff[key.slice 1] = value
) null, (->
  ###*
  # @global waff
  ###
  waff =
    ps: (->
      ###*
      # @func waff#selector.parse
      # @alias waff#ps
      # @desc Parse CSS selectors
      # @param {String} cs - CSS Selector
      # @example
      # // AMD users
      # waff.selector.parse('div#header.white-text')
      # // Non AMD users
      # selector.parse('div#header.white-text')
      # //  {
      # //    tag: 'div',
      # //    id: 'header',
      # //    classList: [ 'white-text' ]
      # //  }
      # @returns {Object} - Returns parsed selector
      ###
    
      parseSelector = (cs) ->
        tag = false
        id = false
        selector = cs or ''
        cn = selector.split '.'
        tag = cn[0] if selector[0] != '.'
        cn.splice 0, 1
        tag = false if tag == ''
        if tag != false and -1 != tag.indexOf '#'
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
        classList: cn
      parseSelector
    )()

    qq: (->
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
    q: (->
      ###*
      # @func waff#query
      # @alias waff#q
      # @desc Query single element
      # @param {String} qs - Query Selector
      # @param {Element|Array|NodeList} [root] - Element to perform query on
      # @example
      # var body = waff.query('body')
      # var body = waff.q('body')
      # @returns {Element|null} - Returns found element or null
      ###
      query = (qs, root) ->
        @qq(qs, root, true)[0] or null
    
      query
    )()

    e: (->
      ###*
      # @func waff#element
      # @alias waff#e
      # @desc Creates element by CSS selector
      # @param {String} cs - CSS Selector
      # @example
      # waff.element('.white-text')
      # @returns {Element} - Returns new element
      ###
      create = (cs) ->
        s = @ps cs
        el = document.createElement s.tag or 'div'
        el.id = s.id if s.id
        for c in s.classList
          el.classList.add c
        el
      create
    )()
    t: (->
      ###*
      # @func waff#text
      # @alias waff#t
      # @desc Creates TextNode
      # @param {String} t - Text
      # @example
      # var text = waff.text('The number of a waffle')
      # text.set('<div></div>')
      # text.get() // &lt;div&gt;&lt;/div&gt;
      # @returns {TextNode} - Returns new TextNode
      ###
      text = (t) ->
         document.createTextNode t
      text
    )()

  # Apply full names
  waff.selector =
    parse: waff.ps

  waff.query = waff.q
  waff.q.all = waff.qq
  waff.query.all = waff.qq

  waff.element = waff.e
  waff.text = waff.t

  waff._version = '1.0.2'

  waff._get = (->
    ###*
    # @func waff#get
    # @desc Performs XHR GET
    # @param {String} url - URL to get
    # @param {Object} options
    # `json` (boolean) - determines if response is json. Default - `false` <br>
    # `timeout` (number) - determines timeout in ms. Default - `2000`
    # @example
    # waff.get('https://wvffle.net')
    #   .then(function(res){
    #
    #   })
    #   .catch(function(err){
    #
    #   })
    # @returns {waff.Promise} - Returns promise of request
    ###
    get = (url, options = {}) ->
      new waff._Promise (f, r) ->
        req = new XMLHttpRequest
        req.open 'get', url, true
        req.timeout = options.timeout or 2000
        req.on 'readystatechange', (e) ->
          if req.readyState == 4
            if req.status >= 200 && req.status < 400
              res = req.responseText
              if options.json == true
                res = JSON.parse res
              req.res = res
              f.call req, res
        req.on 'error', (e) ->
          req.res =
            status: req.status
            error: req.statusText
          r.call req, res
        req.on 'timeout', (e) ->
          req.res =
            status: req.status
            error: req.statusText
          r.call req, res
        req.overrideMimeType 'text/plain'
        req.send()
    get
  )()
  waff._post = (->
    ###*
    # @func waff#post
    # @desc Performs XHR POST
    # @param {String} url - URL to post
    # @param {Object} data - POST data
    # @param {Object} options
    # `json` (boolean) - determines if response is json. Default - `false` <br>
    # `form` (boolean) - determines if data should be converted to FormData or just pure JSON. Default - `true` <br>
    # `timeout` (number) - determines timeout in ms. Default - `2000`
    # @example
    # waff.post('http://httpbin.org/post', { waffle_id: 666 })
    #   .then(function(res){
    #
    #   })
    #   .catch(function(err){
    #
    #   })
    # @returns {waff.Promise} - Returns promise of request
    ###
    post = (url, data = {}, options = {}) ->
      new waff._Promise (f, r) ->
        req = new XMLHttpRequest
        req.open 'post', url, true
        req.timeout = options.timeout or 2000
        req.on 'readystatechange', (e) ->
          if req.readyState == 4
            if req.status >= 200 && req.status < 400
              res = req.responseText
              if options.json == true
                res = JSON.parse res
              req.res = res
              f.call req, res
        req.on 'error', (e) ->
          req.res =
            status: req.status
            error: req.statusText
          r.call req, res
        req.on 'timeout', (e) ->
          req.res =
            status: req.status
            error: req.statusText
          r.call req, res
  
        if !options.form? or options.form == true
          req.setRequestHeader 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'
          form = new FormData
          for key, value of data
            if data.hasOwnProperty key
              form.append key, value
          data = form
        req.send data
    post
  )()

  waff._EventEmitter = (->
    class EventEmitter
      ###*
      # @class waff.EventEmitter
      # @static
      # @classdesc Own implementation of EventEmitter. (untested)
      # @example
      # var ee = new waff.EventEmitter();
      ###
      constructor: ->
        @_emitter = waff.e()
  
      ###*
      # @function waff.EventEmitter.on
      # @instance
      # @desc Adds handler for event
      # @param {String|Array<String>} event - name of event
      # @param {Function} handler - Handler function
      # @param {Boolean} [capture] - Use capture
      # @example
      # var ee = new waff.EventEmitter();
      # // Single event binding
      # ee.on('event-name', function(data){})
      # // Multi event binding
      # ee.on(['event-name', 'event-name2'], function(data){})
      ###
      on: (event, handler, capture) ->
        @_emitter.on.call {emitter: @_emitter, obj: @}, event, handler, capture
  
      ###*
      # @function waff.EventEmitter.once
      # @instance
      # @desc Adds handler only for one event emit
      # @param {String|Array<String>} event - name of event
      # @param {Function} handler - Handler function
      # @param {Boolean} [capture] - Use capture
      # @example
      # var ee = new waff.EventEmitter();
      # // Single event binding
      # ee.once('event-name', function(data){})
      # // Multi event binding
      # ee.once(['event-name', 'event-name2'], function(data){})
      ###
      once: (event, handler, capture) ->
        @_emitter.once.call {emitter: @_emitter, obj: @}, event, handler, capture
  
      ###*
      # @function waff.EventEmitter.off
      # @instance
      # @desc Removes specific event handler
      # @param {String|Array<String>} event - name of event
      # @param {Function} [handler] - Handler function
      # @param {Boolean} [capture] - Use capture
      # @example
      # var ee = new waff.EventEmitter();
      # // Single event unbinding for a specific handler
      # ee.off('event-name', function(){})
      # // Multi event unbinding for a specific handler
      # ee.off(['event-name', 'event-name2'], function(){})
      # // Unbinding all handlers for event
      # ee.off('event-name')
      ###
      off: (event, handler, capture) ->
        @_emitter.off.call {emitter: @_emitter, obj: @}, event, handler, capture
  
      ###*
      # @function waff.EventEmitter.emit
      # @desc Emits event
      # @instance
      # @param {String} event - name of event
      # @param {Object} [data] - Data to pass
      # @example
      # var ee = new waff.EventEmitter();
      # // Emitting event
      # ee.emit('event-name')
      # // Emitting event with data
      # ee.emit('event-name', {my: 'data'})
      ###
      emit: (event, data) ->
        @_emitter.emit.call {emitter: @_emitter, obj: @}, event, data
  
      dispatchEvent: (event, handler, capture) ->
        @_emitter.dispatchEvent.call @_emitter, event, handler, capture
  
  
    ###*
    # @function waff.EventEmitter.extend
    # @static
    # @desc Extends events on object
    # @param {Object} object - object to extend
    # @example
    # var obj = {};
    # EventEmitter.extend(obj);
    # obj.emit('event!')
    ###
    EventEmitter.extend = (object)->
      emitter = object._emitter = waff.e()
      object.on = emitter.on.bind {emitter: emitter, obj: object} unless object.on?
      object.once = emitter.once.bind {emitter: emitter, obj: object} unless object.once?
      object.off = emitter.off.bind {emitter: emitter, obj: object} unless object.off?
      object.dispatchEvent = emitter.dispatchEvent.bind emitter unless object.dispatchEvent?
      object.emit = emitter.emit.bind {emitter: emitter, obj: object} unless object.emit?
      object
  
    EventEmitter
  )()
  waff._Promise = (->
    class Promise extends waff._EventEmitter
  
  
      ###*
      # @class waff.Promise
      # @extends waff.EventEmitter
      # @classdesc Own implementation of Promises. Can bind `this` to functions called in `then` and `catch` and also passes all arguments to them.
      # @param {Function} executor - Executor function
      # @fires fulfill
      # @fires reject
      ###
      constructor: (executor) ->
  
        super()
  
        @_then = []
        @_catch = []
  
        executor @_resolve(@), @_reject(@)
  
      ###*
      # @function waff.Promise.then
      # @desc Adds handler when fulfilled or rejected
      # @param {Function} onFulfill - Fulfiull function
      # @param {Function} [onReject] - Reject function
      # @example
      # var promise = new waff.Promise(function(){})
      # promise.then(function(){
      #
      # })
      ###
      then: (handler, errHandler) ->
        @_then.push handler
        if errHandler?
          @_catch.push errHandler
        @
  
      ###*
      # @function waff.Promise.catch
      # @desc Adds handler when rejected
      # @param {Function} onReject - Reject function
      # @example
      # var promise = new waff.Promise(function(){})
      # promise.catch(function(){
      #
      # })
      ###
      catch: (handler) ->
        @_catch.push handler
        @
  
      _resolve: (self) ->
        ->
          ###*
          # @event waff.Promise.fulfill
          # @desc Event emitted on fulfill
          # @example
          # var promise = new waff.Promise(function(){})
          # promise.on('fulfill', function(){
          #  // same as promise.then
          # })
          ###
          self.emit 'fulfill', arguments
          for handler in self._then
            handler.apply @, arguments
      resolve: ->
        @_resolve(@).apply @, arguments
  
      _reject: (self) ->
        ->
          ###*
          # @event waff.Promise.reject
          # @desc Event emitted on reject
          # @example
          # var promise = new waff.Promise(function(){})
          # promise.on('reject', function(){
          #  // same as promise.catch
          # })
          ###
          self.emit 'reject', arguments
          for handler in self._catch
            handler.apply @, arguments
      reject: ->
        @_reject(@).apply @, arguments
  
    Promise
  )()

  # Register prototypes
  Element::qq = (qs) ->
    waff.qq qs, @
  Element::q = (qs) ->
    waff.q qs, @
  
  Element::query = Element::q
  
  Element::query.all = Element::qq
  Element::q.all = Element::qq
  ###*
  # @function
  # @typicalname Element.prototype.append
  # @desc Adds element at the end
  # @param {Element} element - element to append
  # @example
  # var span = waff.element('span.red')
  # var body = waff.element('body')
  # body.append(span
  # // body
  # //   <content>
  # //   span.red
  ###
  Element::append = ->
    for element in arguments
      @appendChild element
    @
  ###*
  # @function
  # @typicalname Element.prototype.prepend
  # @desc Adds element at the beginning
  # @param {Element} element - element to prepend
  # @example
  # var span = waff.element('span.red')
  # var body = waff.element('body')
  # body.prepend(span)
  # // body
  # //   span.red
  # //   <content>
  ###
  Element::prepend = ->
    for element in arguments
      if @firstChild?
        @insertBefore element, @firstChild
      else
        @append element
    @
  ###*
  # @function
  # @typicalname Element.prototype.before
  # @desc Adds element before
  # @param {Element} element - element to add
  # @example
  # var span = waff.element('span.red')
  # var div = waff.element('div')
  # waff.query('body').append(span)
  # div.before(span)
  # // body
  # //   div
  # //   span.red
  ###
  Element::before = ->
    for element in arguments
      if element.parentElement
        element.parentElement.insertBefore @, element
    @
  ###*
  # @function
  # @typicalname Element.prototype.after
  # @desc Adds element after
  # @param {Element} element - element to add
  # @example
  # var span = waff.element('span.red')
  # var div = waff.element('div')
  # waff.query('body').append(span)
  # div.after(span)
  # // body
  # //   span.red
  # //   div
  ###
  Element::after = ->
    for element in arguments
      if element.parentElement
        if @nextSibling?
          element.parentElement.insertBefore @, element.nextSibling
        else
          element.parentElement.append @
    @
  ###*
  # @function
  # @typicalname Element.prototype.text
  # @desc Sets text of Element to the given string
  # @param {String} [text] - text to set
  # @example
  # var span = waff.element('span')
  # span.text('<div></div>')
  # span.text() // <div></div> as a string
  ###
  Element::text = (text) ->
    unless text?
      return @textContent
  
    @clear()
  
    if text instanceof NodeList or text instanceof Array
      _text = ''
      for t in [].slice.call text
        if t instanceof Text
          _text += t.get()
        else
          if typeof t == 'string'
            _text += t
          else
            _text += t.toString()
      e = waff.t _text
      @append e
      return e
    text = text.get() if text instanceof Text
    e = waff.t text
    @append e
    e
  ###*
  # @function
  # @typicalname Element.prototype.html
  # @desc Sets text of Element to the given string
  # @param {String} [html] - html string to set
  # @example
  # var span = waff.element('span')
  # span.html('<div></div>')
  # span.html() // <div></div> as a string
  ###
  Element::html = (html) ->
    unless html?
      return @innerHTML
  
    @clear()
  
    if html instanceof Element
      @append html
      return @
  
    if html instanceof NodeList or html instanceof Array
      arr = [].slice.call html
      for h in arr
        if h instanceof Element or h instanceof Text
          @append h
      return @
    html = html.get() if html instanceof Text
    @innerHTML = html
    @
  ###*
  # @function
  # @typicalname Element.prototype.path
  # @desc Get unique path of an element
  # @example
  # waff.element('body').path() // html > body:nth-child(2)
  ###
  Element::path = ->
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
  ###*
  # @function
  # @typicalname Element.prototype.css
  # @desc Get or set  elements CSS
  # @param {String|Object} attr - attribute name or object with values
  # @param {String} [value] - attribute value
  # @example
  # waff.element('body').css() // Object containing all properties
  # waff.element('body').css('background-color') // Only `background-color`
  # waff.element('body').css('background-color', '#f00') // sets `background-color` to #f00
  # waff.element('body').css({'background-color': '#f00', 'color', '#ffa500'}) // sets `background-color` to #f00 and `color` to #ffa500
  ###
  Element::css = (css, values) ->
    camel = (str) ->
      str.replace /(\-[a-z])/g, (m) ->
        m.toUpperCase().slice 1
    dash = (str) ->
      str.replace /([A-Z])/g, (m) ->
        "-" + m.toLowerCase()
  
    if typeof css == 'string'
      unless values?
        return @css()[camel css] || @css()[dash css]
      @style[camel css] = values
    if typeof css == 'object'
      for prop, style of css
     		@style[camel prop] = style
      return @
    unless css?
      css = getComputedStyle @
      res = {}
      for prop, style of css
        if isNaN +prop
          res[prop] = style
  		res
  ###*
  # @function
  # @typicalname Element.prototype.attr
  # @desc Sets attributes of element
  # @param {String|Object} attr - attribute name or object with values
  # @param {String} [value] - attribute value
  # @example
  # var span = waff.element('span.red')
  # span.attr('name', 'waffles!')
  # span.attr({'name': 'waffles!', 'sth': true})
  ###
  Element::attr = (attr, value) ->
    if typeof attr == 'object'
      for key, val of attr
        @setAttribute key, val
      return @
    else
      if value?
        @setAttribute attr, value
      else
        return @getAttribute attr
    @
  ###*
  # @function
  # @typicalname Element.prototype.clear
  # @desc Clears element content
  # @example
  # waff.element('body').clear()
  ###
  Element::clear = ->
    while @childNodes.length > 0
      @firstChild.remove()
    @
  ###*
  # @function
  # @typicalname Element.prototype.classes
  # @desc Set of classes
  # @example
  # waff.element('body').classes.contains('cls')
  # waff.element('body').classes.remove('cls')
  # waff.element('body').classes.add('cls')
  # waff.element('body').classes.toggle('cls')
  ###
  Object.defineProperty Element::, 'class',
    configurable: true
    get: ->
      @classList
    set: ->
      @classList
  ###*
  # @function
  # @typicalname Element.prototype.watch
  # @desc Observes for DOM changes
  # @param {MutationObserverInit} [options] - MutationObserver options
  # @fires attr change
  # @fires attr:*
  # @fires child add
  # @fires child remove
  # @fires text change
  # @example
  # var element = waff.query('span.red')
  # element.watch()
  ###
  Element::watch = (options) ->
    unless @_observer?
      @_observer = new MutationObserver (mutations) =>
        for m in mutations
          if m.type == 'attributes'
            knownattrs = [ 'class', 'id', 'style', 'href', 'src' ]
            event = { target: m.target, attr: m.attributeName, oldValue: m.oldValue, value: m.target.attr m.attributeName }
            if -1 != knownattrs.indexOf m.attributeName
              @emit m.attributeName+' change', event
            ###*
            # @event Element.prototype.watch.attr change
            # @desc Event emitted on attribute change
            # @example
            # element.on('attr change', function(e){
            #  // e.target
            #  // e.attr
            #  // e.value
            #  // e.oldValue
            # })
            ###
            @emit 'attr change', event
            @emit 'attr:*', event
            ###*
            # @event Element.prototype.watch.attr:*
            # @desc Event emitted on specific attribute change
            # @example
            # element.on('attr:class', function(e){
            #  // e.target
            #  // e.attr
            #  // e.value
            #  // e.oldValue
            # })
            ###
            @emit 'attr:'+m.attributeName, event
          if m.type = 'childList'
            if m.addedNodes.length > 0
              ###*
              # @event Element.prototype.watch.child add
              # @desc Event emitted on child addition
              # @example
              # element.on('child add', function(e){
              #  // e.target
              #  // e.nodes
              # })
              ###
              @emit 'child add', { target: m.target, nodes: m.addedNodes }
            if m.removedNodes.length > 0
              ###*
              # @event Element.prototype.watch.child remove
              # @desc Event emitted on child remove
              # @example
              # element.on('child remove', function(e){
              #  // e.target
              #  // e.nodes
              # })
              ###
              @emit 'child remove', { target: m.target, nodes: m.removedNodes }
          if m.type = 'characterData'
            ###*
            # @event Element.prototype.watch.text change
            # @desc Event emitted on text change
            # @example
            # element.on('text change', function(e){
            #  // e.target
            #  // e.value
            #  // e.oldValue
            # })
            ###
            @emit 'text change', { target: m.target, oldValue: m.oldValue, value: m.target.get() }
  
        return @
      config =
        attributes: true
        childList: true
        characterData: true
        attributeOldValue: true
        characterDataOldValue: true
        subtree: false
      @_observer.observe @, config
    @
  ###*
  # @function
  # @typicalname Element.prototype.unwatch
  # @desc Stops observing for DOM changes
  # @example
  # var element = waff.query('span.red')
  # element.watch()
  # element.unwatch()
  ###
  Element::unwatch = ->
    if @_observer?
      @_observer.disconnect()
      delete @_observer
    @

  EventTarget::on = (name, next, capture) ->
    unless name instanceof Array
      name = [ name ]
  
    self = if @emitter? then @emitter else @
    _this = if @emitter? then @obj else @
  
    self._events = {} unless self._events?
    self._eventsInited = {} unless self._eventsInited?
  
    for event in name
      self._events[event] = [] unless self._events[event]?
  
      self._events[event].push next
      if self._eventsInited[event] != true
        self.addEventListener event, ((ev) ->
          ev = ev.waffData if ev.waffData?
          for handler in self._events[event]
            handler.call _this, ev
        ), capture
      self._eventsInited[event] = true
    self
  EventTarget::off = (name, next, capture) ->
    unless name instanceof Array
      name = [ name ]
  
    self = if @emitter? then @emitter else @
    self._events = {} unless self._events?
  
    for event in name
      self._events[event] = [] unless self._events[event]?
      self._events[event] = [] unless next?
  
      detach = (next) =>
        index = self._events[event].indexOf next
        if index != -1
          self._events[event].splice index, 1
          detach next
      detach next
    self
  EventTarget::once = (name, next, capture) ->
    unless name instanceof Array
      name = [ name ]
  
    self = if @emitter? then @emitter else @
    _this = if @emitter? then @obj else @
  
    for event in name
      ((event)->
        n = (ev) ->
          next.call _this, ev
          self.off event, n, capture
  
        self.on event, n, capture
      )(event)
  
    self
  EventTarget::emit = (event, data) ->
    self = if @emitter? then @emitter else @
    _this = if @emitter? then @obj else @
    if typeof event == 'string'
      event = new Event event
    if typeof event == 'object'
      event.waffData = data if data
    event.waffThis = _this
    self.dispatchEvent  event

  ###*
  # @function
  # @typicalname Text.prototype.set
  # @desc set nodeValue easier
  # @example
  # var text = waff.text('The number of a waffle')
  # text.set('666')
  # text.get() // 666 as a string
  ###
  Text::set = (text) ->
    @nodeValue = text
    @
  ###*
  # @function
  # @typicalname Text.prototype.get
  # @desc get nodeValue easier
  # @example
  # var text = waff.text('The number of a waffle')
  # text.get() // The number of a waffle
  ###
  Text::get = ->
    @nodeValue

  waff
)()
