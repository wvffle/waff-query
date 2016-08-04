(->
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
