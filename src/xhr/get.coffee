(->
  ###*
  # @func waff#get
  # @desc Performs XHR GET
  # @param {String} url - URL to get
  # @param {Boolean} json - determines if response is json
  # @example
  # waff.get('https://wvffle.net')
  #   .then(function(res){
  #
  #   })
  #   .catch(function(err){
  #
  #   })
  # @returns {Promise} - Returns promise of request
  ###
  get = (url, json) ->
    new Promise (f, r) ->
      req = new XMLHttpRequest
      req.open 'get', url, true
      req.on 'readystatechange', (e) ->
        if req.readyState == 4
          if req.status >= 200 && req.status < 400
            f (if json == true then JSON.parse req.responseText else req.responseText), req
      req.on 'error', (e) ->
        r { status: req.status, error: req.statusText }, req
      req.overrideMimeType 'text/plain'
      req.send()
  get
)()
