describe 'Element::selector', ->

  beforeEach ->
    workspace.reset()

  it 'should return element\'s path', ->
    span = document.querySelector 'span.green'
    expect document.querySelector span.selector
    	.to.be.equal span
