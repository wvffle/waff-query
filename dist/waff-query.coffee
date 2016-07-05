###
# waff-query v0.5.3
# https://github.com/wvffle/waff-query.js#readme
#
# Copyright wvffle.net
# Released under the MIT license
#
# Date: 2016-07-05
###

((coffeFix, waff) ->
  if typeof module != 'undefined'
    module.exports = waff()
    console.log '[waff-query]', 'nodejs found'
  else if typeof define == 'function' and typeof define.amd == 'object'
    define 'waff-query', [ ], waff
    console.log '[waff-query]', 'amd found'
  else
    for key, value of waff()
      @[key] = value
  return
) null, ->
  waff =
    waff: '0.5.3'
    ps: (selector) ->
      tag = false
      id = false
      selector = selector or ''
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

    qq: (qs, root) ->
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
    q: (qs, root) ->
      @qq(qs, root)[0] or null

    e: (selector) ->
      s = @ps selector
      el = document.createElement s.tag or 'div'
      el.id = s.id if s.id
      for c in s.classList
        el.classList.add c
      el
    t: (text) ->
       document.createTextNode text

  # Apply full names
  waff.parseSelector = waff.ps

  waff.query = waff.q
  waff.q.all = waff.qq
  waff.query.all = waff.qq

  waff.element = waff.e
  waff.text = waff.t

  # Register prototypes
  Element::qq = (qs) ->
    waff.qq qs, @
  Element::q = (qs) ->
    waff.q qs, @
  
  Element::query = Element::q
  
  Element::query.all = Element::qq
  Element::q.all = Element::qq
  Element::append = (element) ->
    @appendChild element
    @
  Element::prepend = (element) ->
    if @firstChild?
      @insertBefore element, @firstChild
    else
      @append element
    @
  Element::before = (element) ->
    return unless @parentElement
    @parentElement.insertBefore element, @
    @
  Element::after = (element) ->
    return unless @parentElement
    if @nextSibling?
      @parentElement.insertBefore element, @nextSibling
    else
      @parentElement.append element
    @
  Element::text = (text) ->
    unless text?
      return @textContent
    for node in @childNodes
      node.remove()
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
  Element::html = (html) ->
    unless html?
      return @innerHTML
  
    for node in @childNodes
      node.remove()
  
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
  Element::css = (css, values) ->
    if typeof css == 'string'
      unless values?
        return @css()[css]
      @style[css] = values
    if typeof css == 'object'
      for prop, style of css
     		@style[prop] = style
      return @
    unless css?
      css = getComputedStyle @
      res = {}
      for prop, style of css
        if isNaN +prop
          res[prop] = style
  		res
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

  Element::observe = ->
    unless @_observer?
      @_observerHandlers = []
      @_observer = new MutationObserver (mutations) =>
        for handler in @_observerHandlers
          for mutation in mutations
            handler.call @, mutation
        return @
      config =
        attributes: true
        childList: true
        characterData: true
        subtree: true
        attributeOldValue: true
        characterDataOldValue: true
      @_observer.observe @, config
    @
    
  Element::stopObserving = ->
    if @_observer?
      @_observer.disconnect()
      delete @_observer
    @
  EventTarget::on = (event, next, capture) ->
    self = if @emitter? then @emitter else @
    _this = if @emitter? then @obj else @
    self._events = {} unless self._events?
    self._eventsInited = {} unless self._eventsInited?
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
  
  Element::on = (event, next, capture) ->
    _on = EventTarget::on
    switch event
      when 'mutation'
        @_observerHandlers.push next
      else
        _on.apply this, arguments
    @
  EventTarget::off = (event, next, capture) ->
    self = if @emitter? then @emitter else @
    self._events = {} unless self._events?
    self._events[event] = [] unless self._events[event]?
    self._events[event] = [] unless next?
  
    detach = (next) =>
      index = self._events[event].indexOf next
      if index != -1
        self._events[event].splice index, 1
        detach next
    detach next
    self
  
  Element::off = (event, next, capture) ->
    _off = EventTarget::off
    switch event
      when 'mutation'
        index = @_observerHandlers.indexOf(next)
        if index != -1
          @_observerHandlers.splice index, 1
      else
        _off.apply this, arguments
    @
  EventTarget::once = (event, next, capture) ->
    self = if @emitter? then @emitter else @
    _this = if @emitter? then @obj else @
  
    n = (ev) ->
      next.call _this, ev
      @off event, n, capture
  
    self.on event, n, capture
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
  Event.extend = (object)->
    emitter = object._emitter = e()
    object.on = emitter.on.bind {emitter: emitter, obj: object} unless object.on?
    object.once = emitter.once.bind {emitter: emitter, obj: object} unless object.once?
    object.off = emitter.off.bind {emitter: emitter, obj: object} unless object.off?
    object.dispatchEvent = emitter.dispatchEvent.bind emitter unless object.dispatchEvent?
    object.emit = emitter.emit.bind {emitter: emitter, obj: object} unless object.emit?
    object

  Text::set = (text) ->
    @nodeValue = text
  Text::get = ->
    @nodeValue

  waff
