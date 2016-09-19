describe 'EventTarget::emit', ->

  beforeEach ->
  	workspace.reset()

  it 'should call event', (done) ->
    span = document.createElement 'span'
    @timeout 100
    # NOTE:
    # We're expecting EventTarget.once() to pass all tests
    span.once 'ev', ->
      done()
    span.emit 'ev'

  it 'should call event with custom data', (done) ->
    span = document.createElement 'span'
    @timeout 100
    # NOTE:
    # We're expecting EventTarget.once() to pass all tests
    span.once 'ev', (data) ->
      expect(data.passed).to.be.true
      done()
    span.emit 'ev', passed: true
