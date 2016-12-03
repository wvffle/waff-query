###
# waff-query v2.0.0-beta3
# https://wvffle.net/waff-query/
#
# Copyright wvffle.net
# Released under the MIT license
#
# Date: 2016-12-03
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
        if key[0] == '_'
          @waff[key.slice 1] = value

    # temporary IntelliJ Idea fix
    @ps = @waff.ps
    @qq = @waff.qq
    @q = @waff.q
    @e = @waff.e
    @t = @waff.t
    @selector = @waff.selector
    @element = @waff.element
    @text = @waff.text
    @query = @waff.query
) null, (->
  ###*
  # @namespace waff
  ###
  waff =
    ps: (->
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

    qq: do ->
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
    q: (->
      ###*
      # @func waff#query
      # @alias waff#q
      # @desc Query single element
      # @param {String} selector='body' - CSS Selector
      # @param {Element} [root=document] - Element to perform query on
      # @example
      # var body = waff.query('body')
      # var body = waff.q('body')
      # @returns {Element|null} Returns found element or null
      ###
      query = (qs, root) ->
        @qq(qs, root, true, true) or null
    
      query
    )()

    e: (->
      ###*
      # @func waff#element
      # @alias waff#e
      # @desc Creates element with CSS selector
      # @param {String} selector - CSS Selector
      # @param {Object} [attrs] - Element attributes
      # @param {Element[]} [children] - Element children
      # @example
      # waff.element('.white-text')
      #
      # waff.element('script', { src: 'https://...' })
      #
      # waff.element('.meh', [
      #   waff.element('span', [ waff.text('meh.') ])
      # ])
      # @returns {Element} Returns new element
      ###
      create = (cs, attrs, children) ->
        s = @ps cs
        el = document.createElement s.tag or 'div'
        el.id = s.id if s.id
        for c in s.class
          el.class.add c
        if s.attr
          for attr, parsed of s.attr
            if parsed.operator == '='
              el.attr attr, parsed.value
        if waff.__isarray attrs
          children = attrs
        if attrs?
          if waff.__isobject attrs
            el.attr attrs
        if children?
            for child in children
              if child instanceof Element or child instanceof Text
                el.append child
    
        el
      create
    )()
    t: (->
      ###*
      # @func waff#text
      # @alias waff#t
      # @desc Creates TextNode
      # @param {String} str - Text
      # @example
      # var text = waff.text('The number of a waffle')
      # text.set('<div></div>')
      # text.get() // &lt;div&gt;&lt;/div&gt;
      # @returns {TextNode} Returns new TextNode
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

  waff._version = '2.0.0-beta3'

  waff.__isobject = do ->
    isobject = (obj) ->
      '[object Object]' == Object.prototype.toString.call obj
    isobject
  waff.__isarray = do ->
    isarray = (arr) ->
      arr instanceof Array or arr instanceof NodeList
    isarray
  waff.__toarray = do ->
    toarray = (arr) ->
      a = []
      Array::push.apply a, arr
      a
    toarray
  waff.__has = do ->
    has = (arr, element) ->
      for el, i in arr
        return true if el == element
      false
    has
  waff.__index = do ->
    index = (arr, target) ->
      for subject, i in arr
        return i if subject == target
      -1
    index
  waff.__prop = do ->
    defineProp = (obj, prop, desc) ->
      try
        Object.defineProperty obj, prop, desc
      catch err
        if desc.get?
          Object::__defineGetter__.call obj, prop, desc.get
        if desc.set?
          Object::__defineSetter__.call obj, prop, desc.set
        if desc.value?
          obj[prop] = desc.value
    defineProp

  do ->
    # Polyfill
    # IE support
    unless window.console
      window.console =
        log: ->
        warn: ->
        error: ->
  (->
    # Polyfill
    # IE support
    window.XMLHttpRequest = window.XMLHttpRequest or ->
      try
        return new XDomainRequest
      catch _
      try
        return new ActiveXObject 'Msxml2.XMLHTTP.6.0'
      catch _
      try
        return new ActiveXObject 'Msxml2.XMLHTTP.3.0'
      catch _
      try
        return new ActiveXObject 'Msxml2.XMLHTTP'
      catch _
  
    XMLHttpRequest.UNSENT = 0
    XMLHttpRequest.OPENED = 1
    XMLHttpRequest.HEADERS_RECEIVED = 2
    XMLHttpRequest.LOADING = 3
    XMLHttpRequest.DONE = 4
    do ->
      FormData = (form) ->
        @_data = []
        return if !form
        i = 0
        while i < form.elements.length
          element = form.elements[i]
          if element.name != ''
            @append element.name, element.value
          ++i
  
      return if 'FormData' of window
      FormData.prototype =
        append: (name, value) ->
          if 'Blob' of window and value instanceof window.Blob
            throw TypeError('Blob not supported')
          name = String name
          @_data.push [
            name
            value
          ]
        toString: ->
          @_data.map((pair) ->
            encodeURIComponent(pair[0]) + '=' + encodeURIComponent pair[1]
          ).join '&'
      window.FormData = FormData
      send = window.XMLHttpRequest::send
      window.XMLHttpRequest::send = (body) ->
        if body instanceof FormData
          @setRequestHeader 'Content-Type', 'application/x-www-form-urlencoded' if @setRequestHeader?
          arguments[0] = body.toString()
        send.apply this, arguments
  )()
  (->
    # Polyfill
    # IE support
    try
      new Event 'waff :3'
    catch err
      window.Event = (name, init) ->
        init ?= {}
        ev = document.createEvent 'Event'
        ev.initEvent name, !!init.bubbles, !!init.cancelable
        ev
  )()
  do ->
    try
      window.MutationObserver = window.MutationObserver or window.WebKitMutationObserver or window.MozMutationObserver or do -> throw '-,-'
    catch _
      class MutationObserver
        constructor: (@callback) ->
          @elements = []
        observe: (element, init) ->
          @elements.push element
          if init.childList == true
            element.on 'DOMNodeInserted', (e) =>
              return unless e.relatedNode == e.currentTarget or init.subtree == true
              @callback [
                target: e.relatedNode
                type: 'childList'
                addedNodes: [ e.target ]
                removedNodes: []
              ]
            element.on 'DOMNodeRemoved', (e) =>
              return unless e.relatedNode == e.currentTarget or init.subtree == true
              @callback [
                target: e.relatedNode
                type: 'childList'
                removedNodes: [ e.target ]
                addedNodes: []
              ]
          if init.attributes == true
            element.on 'DOMAttrModified', (e) =>
              return unless e.target == e.currentTarget or init.subtree == true
              p =
                target: e.target
                type: 'attributes'
                attributeName: e.attrName
              if init.attributeOldValue == true
                p.oldValue = e.prevValue
              @callback [ p ]
          if init.characterData == true
            element.on 'DOMCharacterDataModified', (e) =>
              return unless e.target == e.currentTarget or init.subtree == true
              p =
                target: e.target
                type: 'characterData'
              if init.characterDataOldValue == true
                p.oldValue = e.prevValue
              @callback [ p ]
        disconnect: ->
          for element in @elements
            element.off 'DOMNodeInserted'
            element.off 'DOMNodeRemoved'
            element.off 'DOMAttrModified'
            element.off 'DOMCharacterDataModified'
      window.MutationObserver = MutationObserver

  waff._EventTargets = do ->
    try
      EventTarget::waff = ':3'
      # firefox 4 support
      throw '' unless EventTarget::waff == Element::waff
  
      [ EventTarget ]
    catch
      targets = [
        Element
        Document
        Node
        # after polyfill
        FormData
        # safari 5.1 support
        window.constructor
      ]
      targets.push window.XMLHttpRequest if 'XMLHttpRequest' of window
      targets.push window.FileReader if 'FileReader' of window
      targets.push window.Blob if 'Blob' of window
      targets
  waff._EventEmitter = (->
    class EventEmitter
      ###*
      # @class waff#EventEmitter
      # @classdesc Own implementation of EventEmitter. (untested)
      # @example
      # var ee = new waff.EventEmitter();
      ###
      constructor: ->
        @_emitter = waff.e()
  
      ###*
      # @function waff#EventEmitter#on
      # @desc Adds handler for event
      # @param {String|Array<String>} event - Name of event
      # @param {Function} handler - Handler function
      # @param {Boolean} [capture] - Use capture
      # @returns {waff#EventEmitter} instance
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
      # @function waff#EventEmitter#once
      # @desc Adds handler only for one event emit
      # @param {String|Array<String>} event - Name of event
      # @param {Function} handler - Handler function
      # @param {Boolean} [capture] - Use capture
      # @returns {waff#EventEmitter} instance
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
      # @function waff#EventEmitter#off
      # @desc Removes specific event handler
      # @param {String|Array<String>} event - Name of event
      # @param {Function} [handler] - Handler function
      # @param {Boolean} [capture] - Use capture
      # @returns {waff#EventEmitter} instance
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
      # @function waff#EventEmitter#emit
      # @desc Emits event
      # @param {String} event - Name of event
      # @param {Object} [data] - Data to pass
      # @returns {waff#EventEmitter} instance
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
    # @function waff#EventEmitter.extend
    # @static
    # @desc Extends events on object
    # @param {Object} object - Object to extend
    # @returns object
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
      # @class waff#Promise
      # @extends waff#EventEmitter
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
      # @function waff#Promise#then
      # @desc Adds handler when fulfilled or rejected
      # @param {Function} onFulfill - Fulfiull function
      # @param {Function} [onReject] - Reject function
      # @returns {waff#Promise} instance
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
      # @function waff#Promise#catch
      # @desc Adds handler when rejected
      # @param {Function} onReject - Reject function
      # @returns {waff#Promise} instance
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
          # @event waff#Promise#fulfill
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
      ###*
      # @function waff#Promise#resolve
      # @desc Resolves promise
      # @param {*} ..arg - Arguments to pass
      # @returns {waff#Promise} instance
      # @example
      # var promise = new waff.Promise(function(){})
      # promise.resolve()
      ###
      resolve: ->
        @_resolve(@).apply @, arguments
        @
  
      _reject: (self) ->
        ->
          ###*
          # @event waff#Promise#reject
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
      ###*
      # @function waff#Promise#reject
      # @desc Rejects promise
      # @param {*} ..arg - Arguments to pass
      # @returns {waff#Promise} instance
      # @example
      # var promise = new waff.Promise(function(){})
      # promise.reject()
      ###
      reject: ->
        @_reject(@).apply @, arguments
  
    Promise
  )()

  waff._get = do ->
    ###*
    # @func waff#get
    # @desc Performs XHR GET
    # @param {String} url - URL to get
    # @param {Object} options - Options object
    # @param {Boolean} options.json=false - Determines if response is json
    # @param {Boolean} options.timeout=2000 - Determines timeout in ms
    # @example
    # waff.get('https://wvffle.net')
    #   .then(function(res){
    #
    #   })
    #   .catch(function(err){
    #
    #   })
    # @returns {waff#Promise} Returns promise of request
    ###
    get = (url, options = {}) ->
      new waff._Promise (f, r) ->
        try
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
            r.call req, req.res
          req.on 'timeout', (e) ->
            req.res =
              status: req.status
              error: req.statusText
            r.call req, req.res
          try
            req.overrideMimeType 'text/plain'
          req.send()
        catch err
          throw err unless -1 != err.message.indexOf 'Access is denied.'
          console.error 'IE<11 does not handle xhr well'
    get
  waff._post = do ->
    ###*
    # @func waff#post
    # @desc Performs XHR POST
    # @param {String} url - URL to post
    # @param {Object} data={} - POST data
    # @param {Object} options - Options object
    # @param {Boolean} options.json=false - Determines if response is json
    # @param {Boolean} options.form=true - Determines if data should be converted to FormData or just pure json
    # @param {Boolean} options.timeout=2000 - Determines timeout in ms
    # @example
    # waff.post('http://httpbin.org/post', { waffle_id: 666 })
    #   .then(function(res){
    #
    #   })
    #   .catch(function(err){
    #
    #   })
    # @returns {waff#Promise} Returns promise of request
    ###
    post = (url, data = {}, options = {}) ->
      try
        new waff._Promise (f, r) ->
          req = new XMLHttpRequest
          req.open options.method or 'post', url, true
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
            r.call req, req.res
          req.on 'timeout', (e) ->
            req.res =
              status: req.status
              error: req.statusText
            r.call req, req.res
  
          if !options.form? or options.form == true
            req.setRequestHeader 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'
            form = new FormData
            for key, value of data
              if data.hasOwnProperty key
                form.append key, value
            data = form
          else data = JSON.stringify data
          req.send data
      catch err
        throw err unless -1 != err.message.indexOf 'Access is denied.'
        console.error 'IE<11 does not handle xhr well'
    post
  waff._put = do ->
    ###*
    # @func waff#put
    # @desc Performs XHR PUT
    # @param {String} url - URL to put
    # @param {Object} data={} - PUT data
    # @param {Object} options - Options object
    # @param {Boolean} options.json=false - Determines if response is json
    # @param {Boolean} options.form=true - Determines if data should be converted to FormData or just pure json
    # @param {Boolean} options.timeout=2000 - Determines timeout in ms
    # @example
    # waff.put('http://httpbin.org/put', { waffle_id: 666 })
    #   .then(function(res){
    #
    #   })
    #   .catch(function(err){
    #
    #   })
    # @returns {waff#Promise} Returns promise of request
    ###
    put = (url, data = {}, options = {}) ->
      options.method = 'put'
      waff._post url, data, options
    put
  waff._delete = do ->
    ###*
    # @func waff#delete
    # @desc Performs XHR DELETE
    # @param {String} url - URL to delete
    # @param {Object} data={} - DELETE data
    # @param {Object} options - Options object
    # @param {Boolean} options.json=false - Determines if response is json
    # @param {Boolean} options.form=true - Determines if data should be converted to FormData or just pure json
    # @param {Boolean} options.timeout=2000 - Determines timeout in ms
    # @example
    # waff.delete('http://httpbin.org/delete', { waffle_id: 666 })
    #   .then(function(res){
    #
    #   })
    #   .catch(function(err){
    #
    #   })
    # @returns {waff#Promise} Returns promise of request
    ###
    del = (url, data = {}, options = {}) ->
      options.method = 'delete'
      waff._post url, data, options
    del
  waff._patch =  do ->
    ###*
    # @func waff#patch
    # @desc Performs XHR PATCH
    # @param {String} url - URL to patch
    # @param {Object} data={} - PATCH data
    # @param {Object} options - Options object
    # @param {Boolean} options.json=false - Determines if response is json
    # @param {Boolean} options.form=true - Determines if data should be converted to FormData or just pure json
    # @param {Boolean} options.timeout=2000 - Determines timeout in ms
    # @example
    # waff.patch('http://httpbin.org/patch', { waffle_id: 666 })
    #   .then(function(res){
    #
    #   })
    #   .catch(function(err){
    #
    #   })
    # @returns {waff#Promise} Returns promise of request
    ###
    patch = (url, data = {}, options = {}) ->
      options.method = 'patch'
      waff._post url, data, options
    patch
  waff._head = do ->
    ###*
    # @func waff#head
    # @desc Performs XHR HEAD
    # @param {String} url - URL to head
    # @param {Object} options - Options object
    # @param {Boolean} options.timeout=2000 - Determines timeout in ms
    # @example
    # waff.head('http://httpbin.org/head')
    #   .then(function(res){
    #
    #   })
    #   .catch(function(err){
    #
    #   })
    # @returns {waff#Promise} Returns promise of request
    ###
    head = (url, options = {}) ->
      try
        new waff._Promise (f, r) ->
          req = new XMLHttpRequest
          req.open 'head', url, true
          req.timeout = options.timeout or 2000
          req.setRequestHeader 'Access-Control-Expose-Headers', 'Content-Type, Location'
          req.on 'readystatechange', (e) ->
            if req.readyState == 4
              if req.status >= 200 && req.status < 400
                req.res = req.getAllResponseHeaders()
                f.call req, req.getAllResponseHeaders()
          req.on 'error', (e) ->
            req.res =
              status: req.status
              error: req.statusText
            r.call req, req.res
          req.on 'timeout', (e) ->
            req.res =
              status: req.status
              error: req.statusText
            r.call req, req.res
  
          req.send()
      catch err
        throw err unless -1 != err.message.indexOf 'Access is denied.'
        console.error 'IE<11 does not handle xhr well'
    head

  ###*
  # @class Element
  # @global
  ###
  # Register prototypes
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
  # @param {Boolean} [nodelist=false] - Output should be NodeList
  # @example
  # var divs = document.body.query.all('div')
  # @returns {Element[]} Returns found elements
  ###
  Element::qq = (qs, nl) ->
    waff.qq qs, @, null, nl
  
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
  ###*
  # @function
  # @typicalname Element#append
  # @desc Adds element at the end
  # @param {Element|Element[]} ...element - Element to append
  # @example
  # var span = waff.element('span.red')
  # var body = waff.query('body')
  # body.append(span)
  # // body
  # //   <content>
  # //   span.red
  #
  # var span = waff.element('span.orange')
  # var span2 = waff.element('span.red')
  # var body = waff.query('body')
  # body.append(span, span2)
  # // body
  # //   <content>
  # //   span.orange
  # //   span.red
  #
  # var span = waff.element('span.orange')
  # var span2 = waff.element('span.red')
  # var body = waff.query('body')
  # body.append([span, span2])
  # // body
  # //   <content>
  # //   span.orange
  # //   span.red
  ###
  Element::append = ->
    for element in arguments
      if waff.__isarray element
        for el in waff.__toarray element
          @appendChild element
      else
        @appendChild element
    @
  ###*
  # @function
  # @typicalname Element#prepend
  # @desc Adds element at the beginning
  # @param {Element|Element[]} ...element - Element to prepend
  # @example
  # var span = waff.element('span.red')
  # var body = waff.query('body')
  # body.prepend(span)
  # // body
  # //   span.red
  # //   <content>
  #
  # var span = waff.element('span.orange')
  # var span2 = waff.element('span.red')
  # var body = waff.query('body')
  # body.prepend(span, span2)
  # // body
  # //   span.orange
  # //   span.red
  # //   <content>
  #
  # var span = waff.element('span.orange')
  # var span2 = waff.element('span.red')
  # var body = waff.query('body')
  # body.prepend([span, span2])
  # // body
  # //   span.orange
  # //   span.red
  # //   <content>
  ###
  Element::prepend = ->
    for element in arguments by -1
      if waff.__isarray element
        for el in waff.__toarray element by -1
          if @firstChild?
            @insertBefore el, @firstChild
          else
            @append el
      else
        if @firstChild?
          @insertBefore element, @firstChild
        else
          @append element
    @
  ###*
  # @function
  # @typicalname Element#before
  # @desc Adds element before
  # @param {Element} element - Next element
  # @example
  # var span = waff.element('span.red')
  # var div = waff.element('div')
  # waff.query('body').append(span)
  # div.before(span)
  # // body
  # //   div
  # //   span.red
  ###
  Element::before = (element) ->
    if element.parent?
      element.parent.insertBefore @, element
    @
  ###*
  # @function
  # @typicalname Element#after
  # @desc Adds element after
  # @param {Element} element - Previous element
  # @example
  # var span = waff.element('span.red')
  # var div = waff.element('div')
  # waff.query('body').append(span)
  # div.after(span)
  # // body
  # //   span.red
  # //   div
  ###
  Element::after = (element) ->
    if element.parent?
      if element.nextSibling?
        element.parent.insertBefore @, element.nextSibling
      else
        element.parent.append @
    @
  ###*
  # @function
  # @typicalname Element#text
  # @desc Sets text of Element to the given string or returns text string
  # @param {String} [text] - Text to set
  # @example
  # var span = waff.element('span')
  # span.text('<div></div>')
  # span.text() // <div></div> as a string
  ###
  Element::text = (text) ->
    unless text?
      return @textContent
  
    content = not (@childNodes.length == 1 and @childNodes[0] instanceof Text)
    @clear() if content
  
    if waff.__isarray text
      _text = ''
      for t in waff.__toarray text
        if t instanceof Text
          _text += t.get()
        else
          if typeof t == 'string'
            _text += t
          else
            _text += t.toString()
      unless content
        return @childNodes[0].set _text
      else
        e = waff.t _text
        @append e
        return e
    text = text.get() if text instanceof Text
    unless content
      @childNodes[0].set text
    else
      e = waff.t text
      @append e
      e
  
  Array::text = ->
    for element in @
      if element instanceof Element
        element.text.apply element, arguments
    @
  ###*
  # @function
  # @typicalname Element#html
  # @desc Sets text of Element to the given string or returns html string
  # @param {String} [html] - Html string to set
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
  
    if html instanceof NodeList or waff.__isarray html
      arr = waff.__toarray html
      for h in arr
        if h instanceof Element or h instanceof Text
          @append h
      return @
    html = html.get() if html instanceof Text
    @innerHTML = html
    @
  
  Array::html = ->
    for element in @
      if element instanceof Element
        element.html.apply element, arguments
    @
  waff.__prop Element::, 'path',
    configurable: true
    ###*
    # @function Element#path
    # @typicalname Element#path
    # @desc Get unique path of an element
    # @example
    # waff.query('body').path // html > body:nth-child(2)
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
  ###*
  # @function
  # @typicalname Element#css
  # @desc Gets or sets  elements CSS
  # @param {String|Object} attr - Attribute name or object with values
  # @param {String} [value] - Attribute value
  # @example
  # // Object containing all properties
  # waff.element('body').css()
  #
  # // Only `background-color`
  # waff.element('body').css('background-color')
  #
  # // sets `background-color` to #f00
  # waff.element('body').css('background-color', '#f00')
  #
  # // sets `background-color` to #f00 and `color` to #ffa500
  # // (supports camelcase and kebabcase)
  # waff.element('body').css({backgroundColor: '#f00', 'color', '#ffa500'})
  ###
  Element::css = (css, values) ->
    camel = (str) ->
      str.replace /(\-[a-z])/g, (m) ->
        m.toUpperCase().slice 1
    kebab = (str) ->
      str.replace /([A-Z])/g, (m) ->
        "-" + m.toLowerCase()
  
    trbl = (prop, suf = '') ->
      prop = camel prop
      [prop+suf, prop+'Top'+suf, prop+'Bottom'+suf, prop+'Left'+suf, prop+'Right'+suf]
    knownProps = [
      'width'
      'height'
      'lineHeight'
      'fontSize'
      'textIndent'
      'top'
      'left'
      'right'
      'bottom'
      'wordSpacing'
    ]
    [].push.apply knownProps, trbl 'margin'
    [].push.apply knownProps, trbl 'padding'
    [].push.apply knownProps, trbl 'border', 'Width'
  
  
    if typeof css == 'string'
      unless values?
        return @css()[camel css] || @css()[kebab css]
      @style[camel css] = values
    if typeof css == 'object'
      for prop, style of css
        prop = camel prop
        style += 'px' unless (isNaN +style) or -1 == waff.__index knownProps, prop
        @style[prop] = style
      return @
    unless css?
      css = getComputedStyle @
      res = {}
      for prop, style of css
        if isNaN +prop
          res[prop] = style
      # safari 5.1
      if res.color == undefined
        text = res.cssText
        res = {}
        props = text.split ';'
        for prop in props
          rule = prop.split ':'
          res[rule[0].replace /^\s+|\s+$/, ''] = rule[1].replace /^\s+|\s+$/, '' unless rule[1] == undefined
  		res
  
  Array::css = ->
    for element in @
      if element instanceof Element
        element.css.apply element, arguments
    @
  ###*
  # @function
  # @typicalname Element#attr
  # @desc Gets or sets attributes of element
  # @param {String|Object} attr - Attribute name or object with values
  # @param {String} [value] - Attribute value
  # @example
  # var span = waff.element('span.red')
  # span.attr('name', 'waffles!')
  # span.attr({'name': 'waffles!', 'sth': true})
  ###
  Element::attr = (attr, value) ->
    if typeof attr == 'object'
      for key, val of attr
        @attr key, val
      return @
    else unless attr?
      attrs = waff.__toarray @attributes
      res = {}
      for attr in attrs
        res[attr.nodeName] = attr.value
      return res
    else
      if value?
        @setAttribute attr, value
      else if value == null
        @removeAttribute attr
      else
        return @attr()[attr]
    @
  
  Array::attr = ->
    for element in @
      if element instanceof Element
        element.attr.apply element, arguments
    @
  ###*
  # @function
  # @typicalname Element#clear
  # @desc Clears element content
  # @example
  # waff.query('body').clear()
  ###
  Element::clear = ->
    while @childNodes.length > 0
      @removeChild @firstChild
    @
  
  Array::clear = ->
    for element in @
      if element instanceof Element
        element.clear.apply element, arguments
    @
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
  ###*
  # @function Element#watch
  # @typicalname Element#watch
  # @desc Observes for DOM changes
  # @param {MutationObserverInit} [options={ attributes: true, childList: true, characterData: true, attributeOldValue: true, characterDataOldValue: true, subtree: false }] - MutationObserver options
  # @fires attr:*
  # @fires attr change
  # @fires child add
  # @fires child remove
  # @fires text change
  # @example
  # var element = waff.query('span.red')
  # element.watch()
  ###
  Node::watch = (options) ->
    unless @_observer?
      @_observer = new MutationObserver (mutations) =>
        for m in mutations
          if m.type == 'attributes'
            knownattrs = [ 'class', 'id', 'style', 'href', 'src' ]
            event = { target: m.target, attr: m.attributeName, oldValue: m.oldValue, value: m.target.attr m.attributeName }
            unless -1 == waff.__index knownattrs, m.attributeName
              @emit m.attributeName+' change', event
            ###*
            # @event Element#watch.attr change
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
            # @event Element#watch.attr:*
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
          else if m.type == 'childList'
            if m.addedNodes.length > 0
              ###*
              # @event Element#watch.child add
              # @desc Event emitted on child addition
              # @example
              # element.on('child add', function(e){
              #  // e.target
              #  // e.nodes
              # })
              ###
              @emit 'child add', { target: m.target, nodes: waff.__toarray m.addedNodes }
            if m.removedNodes.length > 0
              ###*
              # @event Element#watch.child remove
              # @desc Event emitted on child remove
              # @example
              # element.on('child remove', function(e){
              #  // e.target
              #  // e.nodes
              # })
              ###
              @emit 'child remove', { target: m.target, nodes: waff.__toarray m.removedNodes }
          else if m.type == 'characterData'
            ###*
            # @event Element#watch.text change
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
  
  Array::watch = ->
    for element in @
      if element instanceof Element
        element.watch.apply element, arguments
    @
  ###*
  # @function
  # @typicalname Element#unwatch
  # @desc Stops observing for DOM changes
  # @example
  # var element = waff.query('span.red')
  # element.watch()
  # element.unwatch()
  ###
  Element::unwatch = ->
    if @_observer?
      @_observer.disconnect()
      @_observer = null
    @
  
  Array::unwatch = ->
    for element in @
      if element instanceof Element
        element.unwatch.apply element, arguments
    @
  ###*
  # @function
  # @typicalname Element#parent
  # @desc Get parent element
  # @example
  # waff.query('body').parent // html
  ###
  waff.__prop Element::, 'parent',
    configurable: true
    get: ->
      return @parentNode if @parentNode instanceof Element
      @parentElement
  
    set: (parent) ->
      parent.append @ if parent instanceof Element
      @
  ###*
  # @function
  # @typicalname Element#clone
  # @desc Clones element
  # @param {Boolean} [deep=false] - Deep clone
  # @example
  # waff.query('body').clone()
  ###
  Element::clone = (deep = false) ->
    clone = @cloneNode deep
    clone.original = @
    clone
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
  ###*
  # @function
  # @typicalname Element#next
  # @desc Get next element
  # @example
  # waff.query('head').next // body
  ###
  waff.__prop Element::, 'next',
    configurable: true
    get: ->
      @nextElementSibling
  
    set: (element) ->
      element.after @
      @
  ###*
  # @function
  # @typicalname Element#prev
  # @desc Get previous element
  # @example
  # waff.query('body').prev // head
  ###
  waff.__prop Element::, 'prev',
    configurable: true
    get: ->
      @previousElementSibling
  
    set: (element) ->
      element.before @
      @
  ###*
  # @function
  # @typicalname Element#inside
  # @desc Checks if element is inside another one
  # @param {Element} element - Potential parent
  # @example
  # q('body').inside(q('html')) // true
  ###
  Element::inside = (parent) ->
    return true if @ == parent
    n = @
    while (n = n.parentNode)?
      return true if n == parent
    false
  ###*
  # @function
  # @typicalname Element#has
  # @desc Checks if element has another one
  # @param {Element} element - Potential parent
  # @example
  # q('html').has(q('body')) // true
  ###
  Element::has = (child) ->
    child.inside @

  for Target in waff._EventTargets
    Target::on = (name, next, capture) ->
      listen = ->
        args = waff.__toarray arguments
        el = args.shift()
        ev = args.shift()
        if el.addEventListener?
          args.unshift ev
          el.addEventListener.apply el, args
        else
          args.unshift 'on' + ev
          el.attachEvent.apply el, args
      unless waff.__isarray name
        name = [ name ]
  
      self = if @emitter? then @emitter else @
      _this = if @emitter? then @obj else @
  
      self._events = {} unless self._events?
      self._eventsInited = {} unless self._eventsInited?
  
      for event in name
        self._events[event] = [] unless self._events[event]?
  
        self._events[event].push next
        if self._eventsInited[event] != true
          listen self, event, ((ev) ->
            ev = ev.waffData if ev.waffData?
            for handler in self._events[event]
              handler.call _this, ev
          ), capture
        self._eventsInited[event] = true
      self
  for Target in waff._EventTargets
    Target::off = (name, next, capture) ->
      unless waff.__isarray name
        name = [ name ]
  
      self = if @emitter? then @emitter else @
      self._events = {} unless self._events?
  
      for event in name
        self._events[event] = [] unless self._events[event]?
        self._events[event] = [] unless next?
  
        detach = (next) =>
          index = waff.__index self._events[event], next
          unless index == -1
            self._events[event].splice index, 1
            detach next
        detach next
      self
  for Target in waff._EventTargets
    Target::once = (name, next, capture) ->
      unless waff.__isarray name
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
  for Target in waff._EventTargets
    Target::emit = (event, data) ->
      dispatch = ->
        args = waff.__toarray arguments
        el = args.shift()
        ev = args.shift()
        if el.dispatchEvent?
          args.unshift ev
          el.dispatchEvent.apply el, args
        else
          args.unshift 'on' + ev
          el.fireEvent.apply el, args
      self = if @emitter? then @emitter else @
      _this = if @emitter? then @obj else @
      if typeof event == 'string'
        event = new Event event
      if typeof event == 'object'
        event.waffData = data if data
      event.waffThis = _this
      dispatch self, event

  ###*
  # @class Text
  # @global
  ###
  ###*
  # @function
  # @typicalname Text#set
  # @desc Sets nodeValue
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
  # @typicalname Text#get
  # @desc Gets nodeValue
  # @example
  # var text = waff.text('The number of a waffle')
  # text.get() // The number of a waffle
  ###
  Text::get = ->
    @nodeValue

  waff
)()
