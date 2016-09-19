describe 'Element::clone', ->

  beforeEach ->
    workspace.reset()

  it 'should clone span.green', ->
    green = document.querySelector 'span.green'
    clone = green.clone()
    expect(green.tagName).to.be.equal clone.tagName
    expect(green.id).to.be.equal clone.id
    expect(green.className).to.be.equal clone.className
    expect(green.className).to.be.equal clone.className
    expect(clone.children).to.have.lengthOf 0

  it 'should deeply clone span.green', ->
    green = document.querySelector 'span.green'
    clone = green.clone true
    expect(green.tagName).to.be.equal clone.tagName
    expect(green.id).to.be.equal clone.id
    expect(green.className).to.be.equal clone.className
    expect(green.className).to.be.equal clone.className
    expect(clone.children).to.have.lengthOf 1
