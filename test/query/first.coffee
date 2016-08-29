describe 'q()', ->

  beforeEach ->
    workspace.reset()

  it 'should return document.body', ->
    expect document.body
    	.to.deep.equal q 'body'

  it 'should return #text', ->
    expect document.querySelector '#text'
    	.to.deep.equal q '#text'

  it 'should return first .red', ->
    expect document.querySelector '.red'
    	.to.deep.equal q '.red'
    expect document.querySelector 'span.red'
    	.to.not.deep.equal q '.red'

  it 'should find span.green in Array and NodeList', ->
    expect document.querySelector 'span.green'
    	.to.deep.equal q '.green', [].slice.call document.querySelectorAll 'span'
    expect document.querySelector 'span.green'
    	.to.deep.equal q '.green', document.querySelectorAll 'span'

  it 'should find body', ->
    expect document.body
    	.to.deep.equal q()

  it 'should find html', ->
    expect document.querySelector 'html'
    	.to.deep.equal q ''


describe 'query()', ->

  beforeEach ->
    workspace.reset()

  it 'should be same as q()', ->
    expect query
    	.to.be.equal q
