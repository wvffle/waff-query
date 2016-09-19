describe 'Element::append', ->

  beforeEach ->
    workspace.reset()

  it 'should put #text at the end of .workspace', ->
    workspace.element.append document.querySelector '#text'

    expect workspace.element.lastChild
      .to.be.equal document.querySelector '#text'
