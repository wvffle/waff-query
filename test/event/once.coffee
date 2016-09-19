describe 'EventTarget::once', ->

  beforeEach ->
  	workspace.reset()

  it 'should attach handler for one call', ->
    span = document.createElement 'span'
    missed_calls = 0

    handler = ->
      expect this
      	.to.be.equal span
      missed_calls++

    span.once 'ev', handler
    span.dispatchEvent new Event 'ev'
    expect missed_calls
    	.to.be.equal 1
    span.dispatchEvent new Event 'ev'
    expect missed_calls
    	.to.be.equal 1

  it 'should attach many handlers for one call', ->
    span = document.createElement 'span'
    missed_calls = 0

    handler = ->
      expect this
      	.to.be.equal span
      missed_calls++

    span.once [ 'ev', 'ev2' ], handler
    span.dispatchEvent new Event 'ev'
    expect missed_calls
    	.to.be.equal 1
    span.dispatchEvent new Event 'ev'
    expect missed_calls
    	.to.be.equal 1
