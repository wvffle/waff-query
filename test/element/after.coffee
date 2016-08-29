describe 'Element::after', ->
  
  beforeEach ->
    workspace.reset()

  it 'should put span.red after span.green', ->
    document.querySelector 'span.red'
      .after document.querySelector 'span.green'
    expect document.querySelector('span.green').nextSibling
      .to.be.equal document.querySelector 'span.red'
