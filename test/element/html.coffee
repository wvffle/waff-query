describe 'Element::html', ->

  beforeEach ->
    workspace.reset()

  it 'should clear span.green', ->
    span = document.querySelector 'span.green'
    span.html ''
    expect span.innerHTML
    	.to.equal ''

  it 'should return span.green\'s html', ->
    span = document.querySelector 'span.green'
    html = span.html()
    expect span.innerHTML
    	.to.equal html

  it 'should set span.green\'s html to <div></div>', ->
    span = document.querySelector 'span.green'
    span.html '<div></div>'
    expect span.innerHTML
    	.to.equal '<div></div>'

  it 'should set span.green\'s html to all divs', ->
    span = document.querySelector 'span.green'
    divs = workspace.element.querySelectorAll 'div'
    span.html divs
    expect [].slice.call span.children
    	.to.deep.equal [].slice.call divs
