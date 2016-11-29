describe 'Element::parent', ->

  beforeEach ->
    workspace.reset()

  it 'should return element\'s parent', ->
    span = document.querySelector 'span.green'
    expect span.parent
    	.to.be.equal span.parentElement or span.parentNode

  it 'should set element\'s parent', ->
    span = document.querySelector 'span.green'
    span.parent = document.body
    expect span.parentElement or span.parentNode
    	.to.be.equal document.body
    document.body.removeChild span
