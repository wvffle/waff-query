describe 'Element::has', ->

  beforeEach ->
    workspace.reset()

  it 'should check if html has body', ->
    expect (q '').has q()
      .to.be.true
  it 'should check if body has html', ->
    expect q().has q ''
      .to.be.false
