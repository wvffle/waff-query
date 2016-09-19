describe 'waff.get()', ->
  it 'should perform get request', (done) ->
    waff.get 'https://posttestserver.com/post.php'
    	.then (res) ->
     		expect @status
        	.to.be.equal 200
      	done()
    	.catch (res) ->
      	expect @status
        	.to.be.equal 200
      	done @res

    @timeout 3000
