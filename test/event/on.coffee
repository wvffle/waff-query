describe 'EventTarget::on', ->

  beforeEach ->
  	workspace.reset()

  it 'should attach event', (done) ->
    span = document.createElement 'span'
    @timeout 100
    span.on 'ev', ->
      expect this
      	.to.be.equal span
      done()
      span.remove()
    span.dispatchEvent new Event 'ev'

  it 'should attach many events', (done) ->
    span = document.createElement 'span'
    e = 0
    @timeout 100
    span.on [ 'ev', 'ev2' ], ->
      expect this
      	.to.be.equal span
      e++
      if e == 2
        done()
        span.remove()

    span.dispatchEvent new Event 'ev'
    span.dispatchEvent new Event 'ev2'
