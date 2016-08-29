describe 't()', ->
  it 'should create new TextNode', ->
    text = t 'hey'
    expect text
    	.to.be.an.instanceof Text
    expect text.nodeValue
    	.to.be.equal 'hey'

describe 'text()', ->
  it 'should be same as t()', ->
    expect text
    	.to.be.equal t
