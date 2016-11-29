describe 'Element::watch', ->

  beforeEach ->
    workspace.reset()

  it 'should watch span.green', ->
    span = document.querySelector 'span.green'
    span.watch()
    expect(span._observer).to.not.be.null

  it 'should call `attr:*` in span.green', (done) ->
    @timeout 10
    span = document.querySelector 'span.green'
    span.watch()
    span.on 'attr:*', (e) ->
      expect(e.target).to.be.equal @
      expect(e.attr).to.be.equal 'name'
      expect(e.value).to.be.equal 'orange'
      expect(e.oldValue).to.be.oneOf ['', null]
      @_observer.disconnect()
      @_observer = null
      done()
    span.setAttribute 'name', 'orange'

  it 'should call `attr:name` in span.green', (done) ->
    @timeout 10
    span = document.querySelector 'span.green'
    span.watch()
    span.on 'attr:name', (e) ->
      expect(e.target).to.be.equal @
      expect(e.attr).to.be.equal 'name'
      expect(e.value).to.be.equal 'orange'
      expect(e.oldValue).to.be.oneOf ['', null]
      @_observer.disconnect()
      @_observer = null
      done()
    span.setAttribute 'name', 'orange'

  it 'should call `attr change` in span.green', (done) ->
    @timeout 10
    span = document.querySelector 'span.green'
    span.watch()
    span.on 'attr change', (e) ->
      expect(e.target).to.be.equal @
      expect(e.attr).to.be.equal 'name'
      expect(e.value).to.be.equal 'orange'
      expect(e.oldValue).to.be.oneOf ['', null]
      @_observer.disconnect()
      @_observer = null
      done()
    span.setAttribute 'name', 'orange'

  it 'should call `class change` in span.green', (done) ->
    @timeout 10
    span = document.querySelector 'span.green'
    span.watch()
    span.on 'class change', (e) ->
      expect(e.target).to.be.equal @
      expect(e.attr).to.be.equal 'class'
      expect(e.value).to.be.equal 'green orange'
      expect(e.oldValue).to.be.equal 'green'
      @_observer.disconnect()
      @_observer = null
      done()
    span.className += ' orange'

  it 'should call `child add` in span.green', (done) ->
    @timeout 10
    span = document.querySelector 'span.green'
    div = document.createElement 'div'
    span.watch()
    span.on 'child add', (e) ->
      expect(e.target).to.be.equal @
      expect(e.nodes).to.be.deep.equal [div]
      @_observer.disconnect()
      @_observer = null
      done()
    span.appendChild div

  it 'should call `child remove` in span.green', (done) ->
    @timeout 10
    span = document.querySelector 'span.green'
    h1 = span.querySelector 'h1'
    span.watch()
    span.on 'child remove', (e) ->
      expect(e.target).to.be.equal @
      expect(e.nodes).to.be.deep.equal [h1]
      @_observer.disconnect()
      @_observer = null
      done()
    span.removeChild h1

  it 'should call `text change` in span.green', (done) ->
    @timeout 10
    h1 = document.querySelector 'span.green h1'
    t = h1.childNodes[0]
    v = t.nodeValue
    t.watch()
    t.on 'text change', (e) ->
      expect(e.target).to.be.equal @
      expect(e.value).to.be.equal '2'
      expect(e.oldValue).to.be.equal v
      @_observer.disconnect()
      @_observer = null
      done()
    t.nodeValue = '2'
