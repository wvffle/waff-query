describe 'EventTarget::off', ->

  beforeEach ->
  	workspace.reset()

  it 'should detach handler', ->
    span = document.createElement 'span'
    handler = ->

    # NOTE:
    # We're expecting that EventTarget.on() passes all tests
    span.on 'ev', handler
    span.on 'ev', ->
    expect span._events.ev
    	.to.have.lengthOf 2
    span.off 'ev', handler
    expect span._events.ev
    	.to.have.lengthOf 1
    span.remove()

  it 'should detach all same handlers', ->
    span = document.createElement 'span'
    handler = ->

    # NOTE:
    # We're expecting that Element.on() passes all tests
    span.on 'ev', handler
    span.on 'ev', handler
    span.on 'ev', ->
    expect span._events.ev
    	.to.have.lengthOf 3
    span.off 'ev', handler
    expect span._events.ev
    	.to.have.lengthOf 1
    span.remove()

  it 'should detach all handlers', ->
    span = document.querySelector 'span.green'
    handler = ->

    # NOTE:
    # We're expecting that Element.on() passes all tests
    span.on 'ev', handler
    span.on 'ev', handler
    span.on 'ev', ->
    expect span._events.ev
    	.to.have.lengthOf 3
    span.off 'ev'
    expect span._events.ev
    	.to.have.lengthOf 0
    span.remove()
