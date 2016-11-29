describe 'Text::get', ->
  it 'should get text\'s value to string', ->
    text = document.createTextNode 'hey'
    expect text
    	.to.be.an.instanceof Text
    expect text.get()
    	.to.be.equal text.nodeValue
