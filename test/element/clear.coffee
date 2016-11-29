describe 'Element::clear', ->

  beforeEach ->
    workspace.reset()

  it 'should clear .workspace', ->
    document.querySelector '.workspace'
    	.clear()
    expect(document.querySelector('.workspace').childNodes).to.have.lengthOf 0
