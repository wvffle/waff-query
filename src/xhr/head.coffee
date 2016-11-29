do ->
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
