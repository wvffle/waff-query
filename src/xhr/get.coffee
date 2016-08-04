(->
  ###*
  # @func waff#get
  # @desc Performs XHR GET
  # @param {String} url - URL to get
  # @param {Object} options
  # `json` (boolean) - determines if response is json. Default - `false` <br>
  # `timeout` (number) - determines timeout in ms. Default - `2000`
  # @example
  # waff.get('https://wvffle.net')
  #   .then(function(res){
  #
  #   })
  #   .catch(function(err){
  #
  #   })
  # @returns {waff.Promise} - Returns promise of request
  ###
  get = (url, options = {}) ->
    new waff._Promise (f, r) ->
      req = new XMLHttpRequest
      req.open 'get', url, true
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
      req.overrideMimeType 'text/plain'
      req.send()
  get
)()
