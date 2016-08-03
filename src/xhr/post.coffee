(->
  ###*
  # @func waff#post
  # @desc Performs XHR POST
  # @param {String} url - URL to get
  # @param {Object} data - POST data
  # @param {Object} options
  # * `json` (boolean) - determines if response is json. Default - `false`
  # * `form` (boolean) - determines if data should be converted to FormData or just pure JSON. Default - `true`
  # * `timeout` (number) - determines timeout in ms. Default - `2000`
  # @example
  # waff.post('http://httpbin.org/post', { waffle_id: 666 })
  #   .then(function(res){
  #
  #   })
  #   .catch(function(err){
  #
  #   })
  # @returns {Promise} - Returns promise of request
  ###
  post = (url, data = {}, options = {}) ->
    new Promise (f, r) ->
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
            f req
      req.on 'error', (e) ->
        req.res =
          status: req.status
          error: req.statusText
        r req
      req.on 'timeout', (e) ->
        req.res =
          status: req.status
          error: req.statusText
        r req

      req.setRequestHeader 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'
      if !options.form? or options.form == true
        form = new FormData
        for key, value of data
          if data.hasOwnProperty key
            form.append key, value
        data = form
      req.send data
  post
)()
