describe 'waff.post()', ->
  it 'should perform post request', (done) ->
    waff.post 'https://httpbin.org/post', {}
    	.then (res) ->
      	expect @status
        	.to.be.equal 200
      	done()
    	.catch (res) ->
      	expect @status
        	.to.be.equal 200
      	done @res

    @timeout 3000
