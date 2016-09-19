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
    ps: <%= include('selector/parse', '    ') %>

    qq: <%= include('query/all', '    ') %>
    q: <%= include('query/first', '    ') %>

    e: <%= include('element/create', '    ') %>
    t: <%= include('text/create', '    ') %>

  # Apply full names
  waff.selector =
    parse: waff.ps

  waff.query = waff.q
  waff.q.all = waff.qq
  waff.query.all = waff.qq

  waff.element = waff.e
  waff.text = waff.t

  waff._version = '<%= version %>'

  waff.__isarray = <%= include('util/isarray', '  ') %>
  waff.__toarray = <%= include('util/toarray', '  ') %>
  waff.__has = <%= include('util/has', '  ') %>
  waff.__index = <%= include('util/index', '  ') %>
  waff.__prop = <%= include('util/defineproperty', '  ') %>

  <%= include('polyfill/console', '  ') %>
  <%= include('polyfill/xhr', '  ') %>
  <%= include('polyfill/event', '  ') %>
  <%= include('polyfill/mutation', '  ') %>

  waff._EventTargets = <%= include('event/targets', '  ') %>
  waff._EventEmitter = <%= include('classes/eventemitter', '  ') %>
  waff._Promise = <%= include('classes/promise', '  ') %>

  waff._get = <%= include('xhr/get', '  ') %>
  waff._post = <%= include('xhr/post', '  ') %>

  ###*
  # @class Element
  # @global
  ###
  # Register prototypes
  <%= include('element/query', '  ') %>
  <%= include('element/append', '  ') %>
  <%= include('element/prepend', '  ') %>
  <%= include('element/before', '  ') %>
  <%= include('element/after', '  ') %>
  <%= include('element/text', '  ') %>
  <%= include('element/html', '  ') %>
  <%= include('element/path', '  ') %>
  <%= include('element/css', '  ') %>
  <%= include('element/attr', '  ') %>
  <%= include('element/clear', '  ') %>
  <%= include('element/classes', '  ') %>
  <%= include('element/watch', '  ') %>
  <%= include('element/unwatch', '  ') %>
  <%= include('element/parent', '  ') %>
  <%= include('element/clone', '  ') %>

  <%= include('event/on', '  ') %>
  <%= include('event/off', '  ') %>
  <%= include('event/once', '  ') %>
  <%= include('event/emit', '  ') %>

  ###*
  # @class Text
  # @global
  ###
  <%= include('text/set', '  ') %>
  <%= include('text/get', '  ') %>

  waff
)()
