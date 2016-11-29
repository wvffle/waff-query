describe 'Element::inside', ->

  beforeEach ->
    workspace.reset()

  it 'should check if body is in html', ->
    expect (q '').inside q()
      .to.be.false
  it 'should check if html is not in body', ->
    expect q().inside q ''
      .to.be.true
