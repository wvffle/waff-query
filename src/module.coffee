((coffeFix, waff) ->
  if typeof module != 'undefined'
    module.exports = waff()
    console.log '[waff-query]', 'nodejs found'
  else if typeof define == 'function' and typeof define.amd == 'object'
    define 'waff-query', [ ], waff
    console.log '[waff-query]', 'amd found'
  else
    waff = waff()
    @waff = waff
    for key, value of waff
      unless key[0] == '_'
        @[key] = value
      else
        @waff[key.slice 1] = value
) null, ->
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
  waff._get = <%= include('xhr/get', '  ') %>
  waff._post = <%= include('xhr/post', '  ') %>

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

  <%= include('event/observe', '  ') %>
  <%= include('event/on', '  ') %>
  <%= include('event/off', '  ') %>
  <%= include('event/once', '  ') %>
  <%= include('event/emit', '  ') %>
  <%= include('event/extend', '  ') %>

  <%= include('text/set', '  ') %>
  <%= include('text/get', '  ') %>

  waff
