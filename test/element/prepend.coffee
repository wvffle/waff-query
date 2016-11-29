describe 'Element::prepend', ->

  beforeEach ->
    workspace.reset()

  it 'should put #text at the begining of .workspace', ->
    workspace.element.prepend document.querySelector '#text'
    expect workspace.element.firstChild
    	.to.be.equal document.querySelector '#text'
