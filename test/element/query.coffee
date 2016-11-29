describe 'Element::q', ->

  beforeEach ->
  	workspace.reset()

  it 'should return span.green', ->
    expect workspace.element.q 'span.green'
    	.to.be.equal workspace.element.querySelector 'span.green'

  it 'should return .orange.blue', ->
    expect workspace.element.q '.orange.blue'
    	.to.be.equal workspace.element.querySelector '.orange.blue'


describe 'Element::query', ->

  beforeEach ->
  	workspace.reset()

  it 'should be equal to Element.q()', ->
    expect workspace.element.query
    	.to.be.equal workspace.element.q


describe 'Element::qq', ->

  beforeEach ->
  	workspace.reset()

  it 'should return all spans', ->
    expect workspace.element.qq 'span'
    	.to.deep.equal [].slice.call workspace.element.querySelectorAll 'span'


describe 'Element::query.all', ->

  beforeEach ->
  	workspace.reset()

  it 'should be equal to Element.qq()', ->
    expect workspace.element.query.all
    	.to.be.equal workspace.element.qq

  it 'should be equal to Element.q.all()', ->
    expect workspace.element.query.all
    	.to.be.equal workspace.element.q.all
