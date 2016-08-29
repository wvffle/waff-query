describe 'Element::path', ->

  beforeEach ->
    workspace.reset()

  it 'should return element\'s path', ->
    span = document.querySelector 'span.green'
    expect document.querySelector span.path()
    	.to.be.equal span
