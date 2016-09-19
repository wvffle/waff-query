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
