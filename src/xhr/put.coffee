do ->
  ###*
  # @func waff#put
  # @desc Performs XHR PUT
  # @param {String} url - URL to put
  # @param {Object} data={} - PUT data
  # @param {Object} options - Options object
  # @param {Boolean} options.json=false - Determines if response is json
  # @param {Boolean} options.form=true - Determines if data should be converted to FormData or just pure json
  # @param {Boolean} options.timeout=2000 - Determines timeout in ms
  # @example
  # waff.put('http://httpbin.org/put', { waffle_id: 666 })
  #   .then(function(res){
  #
  #   })
  #   .catch(function(err){
  #
  #   })
  # @returns {waff#Promise} Returns promise of request
  ###
  put = (url, data = {}, options = {}) ->
    options.method = 'put'
    waff._post url, data, options
  put
