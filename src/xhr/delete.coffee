do ->
  ###*
  # @func waff#delete
  # @desc Performs XHR DELETE
  # @param {String} url - URL to delete
  # @param {Object} data={} - DELETE data
  # @param {Object} options - Options object
  # @param {Boolean} options.json=false - Determines if response is json
  # @param {Boolean} options.form=true - Determines if data should be converted to FormData or just pure json
  # @param {Boolean} options.timeout=2000 - Determines timeout in ms
  # @example
  # waff.delete('http://httpbin.org/delete', { waffle_id: 666 })
  #   .then(function(res){
  #
  #   })
  #   .catch(function(err){
  #
  #   })
  # @returns {waff#Promise} Returns promise of request
  ###
  del = (url, data = {}, options = {}) ->
    options.method = 'delete'
    waff._post url, data, options
  del
