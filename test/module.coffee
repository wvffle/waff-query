global = global or this
requirejs.config paths: 'waff-query': '../dist/waff-query.dev'
describe 'module', ->
  it 'should be in global scope', ->
    expect global.waff
    	.to.not.be.null
    expect global.waff.version
    	.to.not.be.null

  # NOTE:
  # Basically if it works with amd it should also work with pure node
  it 'should be requireable by amd', (done) ->
    requirejs [ 'waff-query' ], (waffq) ->
      expect waffq
      	.to.not.be.null
      expect waffq.version
      	.to.not.be.null
      done()
    @timeout 666
