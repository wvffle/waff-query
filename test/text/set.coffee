describe 'Text::set', ->
  it 'should set text\'s value to string', ->
    text = document.createTextNode 'hey'
    text.set 'no'
    expect text
    	.to.be.an.instanceof Text
    expect text.nodeValue
    	.to.be.equal 'no'
