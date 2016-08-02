(->
  ###*
  # @func waff#post
  # @desc Performs XHR POST
  # @param {String} url - URL to get
  # @param {Object} data - POST data
  # @param {Object} options
  # * `json` (boolean) - determines if response is json. Default - `false`
  # * `form` (boolean) - determines if data should be converted to FormData or just pure JSON. Default - `true`
  # @example
  # waff.post('http://httpbin.org/post', { waffle_id: 666 })
  #   .then(function(){
  #
  #   })
  #   .catch(function(err){
  #
  #   })
  # @returns {Promise} - Returns promise of request
  ###
  get = (url, data, options) ->
    new Promise (f, r) ->
      options or= {}
      req = new XMLHttpRequest
      req.open 'post', url, true
      req.on 'readystatechange', (e) ->
        if req.readyState == 4
          if req.status >= 200 && req.status < 400
            f (if options.json == true then JSON.parse req.responseText else req.responseText), req
      req.on 'error', (e) ->
        r { status: req.status, error: req.statusText }, req

      req.setRequestHeader 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'
      if !options.form? or options.form == true
        form = new FormData
        for key, value of data
          form.append key, value
        data = form
      req.send data
  get
)()
