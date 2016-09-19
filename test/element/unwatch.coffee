describe 'Element::unwatch', ->

  beforeEach ->
    workspace.reset()

  it 'should stop watching span.green', ->
    span = document.querySelector 'span.green'
    span._observer = new MutationObserver ->
    span.unwatch()
    expect(span._observer).to.be.null
