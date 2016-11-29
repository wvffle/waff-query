describe 'Element::prev', ->

  beforeEach ->
    workspace.reset()

  it 'should return span.red', ->
    expect document.querySelector('span.green').prev
      .to.be.equal document.querySelector 'span.red'

  it 'should move span.green before span.red', ->
    green = document.querySelector 'span.green'
    red = document.querySelector 'span.red'

    red.prev = green

    expect green.nextElementSibling
      .to.be.equal red
