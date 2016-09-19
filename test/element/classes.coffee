describe 'Element::classes', ->

  beforeEach ->
    workspace.reset()

  it 'should add .orange to span.green', ->
    green = document.querySelector 'span.green'
    green.class.add 'orange'
    expect(green.className).to.be.equal 'green orange'

  it 'should remove .green from span.green', ->
    green = document.querySelector 'span.green'
    green.class.remove 'green'
    expect(green.className).to.be.equal ''

  it 'should have .green in span.green', ->
    green = document.querySelector 'span.green'
    expect(green.class.has 'green').to.be.true

  it 'should toggle .green in span.green', ->
    green = document.querySelector 'span.green'
    green.class.toggle 'green'
    expect(green.className).to.be.equal ''
    green.class.toggle 'green'
    expect(green.className).to.be.equal 'green'
