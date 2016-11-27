do ->
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
