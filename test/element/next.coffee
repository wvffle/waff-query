describe 'Element::next', ->

  beforeEach ->
    workspace.reset()

  it 'should return span.green', ->
    expect document.querySelector('span.red').next
      .to.be.equal document.querySelector 'span.green'

  it 'should move span.green before span.red', ->
    green = document.querySelector 'span.green'
    red = document.querySelector 'span.red'

    green.next = red

    expect green.next
      .to.be.equal red
