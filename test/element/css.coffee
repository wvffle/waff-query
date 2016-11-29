describe 'Element::css', ->

  beforeEach ->
    workspace.reset()

  it 'should set color and background of span.green to red and font-size to 10px', ->
    span = document.querySelector 'span.green'
    span.css
      color: 'rgb(255, 0, 0)'
      backgroundColor: 'rgb(255, 0, 0)'
      'font-size': '10px'
    expect getComputedStyle(span).color
    	.to.be.equal 'rgb(255, 0, 0)'
    expect getComputedStyle(span).backgroundColor
    	.to.be.equal 'rgb(255, 0, 0)'
    expect getComputedStyle(span).fontSize
    	.to.be.equal '10px'

  it 'should set color of span.green to red the other way', ->
    span = document.querySelector 'span.green'
    span.css 'color', 'rgb(255, 0, 0)'
    expect getComputedStyle(span).color
    	.to.be.equal 'rgb(255, 0, 0)'


  it 'should get color of span.green', ->
    span = document.querySelector 'span.green'
    expect span.css 'color'
    	.to.be.equal 'rgb(0, 255, 0)'

  it 'should set font-size of span to 10px', ->
    span = document.querySelector 'span.green'
    span.css
      fontSize: 10
    expect getComputedStyle(span).fontSize
      .to.be.equal '10px'
