describe 'Element::text', ->

  beforeEach ->
  	workspace.reset()

  it 'should clear span.green', ->
    span = document.querySelector 'span.green'
    span.text ''
    expect span.childNodes
    	.to.have.lengthOf 1
    expect span.childNodes[0].nodeValue
  		.to.equal ''

    span = document.querySelector 'span.orange'
    span.text ''
    expect span.childNodes
    	.to.have.lengthOf 1
    expect span.childNodes[0].nodeValue
  		.to.equal ''

  it 'should return span.green\'s text', ->
    span = document.querySelector 'span.green'
    expect span.text()
    	.to.equal span.textContent

    span = document.querySelector 'span.orange'
    expect span.text()
    	.to.equal span.textContent

  it 'should set span.green\'s text to <div></div>', ->
    span = document.querySelector 'span.green'
    span.text '<div></div>'
    expect span.childNodes
    	.to.have.lengthOf 1
    expect span.childNodes[0].nodeValue
    	.to.equal '<div></div>'

    span = document.querySelector 'span.orange'
    span.text '<div></div>'
    expect span.childNodes
    	.to.have.lengthOf 1
    expect span.childNodes[0].nodeValue
    	.to.equal '<div></div>'

  it 'should set span.green\'s text to array of strings', ->
    span = document.querySelector 'span.green'
    span.text [
      'well'
      ' '
      'then'
    ]
    expect span.childNodes
  		.to.have.lengthOf 1
    expect span.childNodes[0].nodeValue
    	.to.equal 'well then'
      
    span = document.querySelector 'span.orange'
    span.text [
      'well'
      ' '
      'then'
    ]
    expect span.childNodes
  		.to.have.lengthOf 1
    expect span.childNodes[0].nodeValue
    	.to.equal 'well then'
