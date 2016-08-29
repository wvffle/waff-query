describe 'Element::before', ->

  beforeEach ->
    workspace.reset()

  it 'should put span.green before span.red', ->
    document.querySelector 'span.green'
    	.before document.querySelector 'span.red'
    expect(document.querySelector('span.green').nextSibling).to.be.deep.equal document.querySelector 'span.red'
