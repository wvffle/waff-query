describe 'waff.EventEmitter', ->

  context 'EventEmitter::emit', ->

    it 'should call event', (done) ->
      ee = new waff.EventEmitter
      @timeout 100
      # NOTE:
      # We're expecting EventTarget.once() to pass all tests
      ee.once 'ev', ->
        done()

      ee.emit 'ev'

    it 'should call event with custom data', (done) ->
      ee = new waff.EventEmitter
      @timeout 100
      # NOTE:
      # We're expecting EventTarget.once() to pass all tests
      ee.once 'ev', (data) ->
        expect(data.passed).to.be.true
        done()

      ee.emit 'ev', passed: true

  context 'EventEmitter::off', ->

    it 'should detach handler', ->
      ee = new waff.EventEmitter
      handler = ->

      # NOTE:
      # We're expecting that EventTarget.on() passes all tests
      ee.on 'ev', handler
      ee.on 'ev', ->
      expect ee._emitter._events.ev
      	.to.have.lengthOf 2
      ee.off 'ev', handler
      expect ee._emitter._events.ev
      	.to.have.lengthOf 1


    it 'should detach all same handlers', ->
      ee = new waff.EventEmitter
      handler = ->

      # NOTE:
      # We're expecting that Element.on() passes all tests
      ee.on 'ev', handler
      ee.on 'ev', handler
      ee.on 'ev', ->
      expect ee._emitter._events.ev
      	.to.have.lengthOf 3
      ee.off 'ev', handler
      expect ee._emitter._events.ev
      	.to.have.lengthOf 1


    it 'should detach all handlers', ->
      ee = new waff.EventEmitter
      handler = ->

      # NOTE:
      # We're expecting that Element.on() passes all tests
      ee.on 'ev', handler
      ee.on 'ev', handler
      ee.on 'ev', ->
      expect ee._emitter._events.ev
      	.to.have.lengthOf 3
      ee.off 'ev'
      expect ee._emitter._events.ev
      	.to.have.lengthOf 0


  context 'EventEmitter::on', ->

    it 'should attach event', (done) ->
      ee = new waff.EventEmitter
      @timeout 100
      ee.on 'ev', ->
        expect this
        	.to.be.equal ee
        done()
      ee.dispatchEvent new Event 'ev'

    it 'should attach many events', (done) ->
      ee = new waff.EventEmitter
      e = 0
      @timeout 100
      ee.on [ 'ev', 'ev2' ], ->
        expect this
        	.to.be.equal ee
        e++
        if e == 2
          done()

      ee.dispatchEvent new Event 'ev'
      ee.dispatchEvent new Event 'ev2'

  context 'EventEmitter::once', ->

    it 'should attach handler for one call', ->
      ee = new waff.EventEmitter
      missed_calls = 0

      handler = ->
        expect this
        	.to.be.equal ee
        missed_calls++

      ee.once 'ev', handler
      ee.dispatchEvent new Event 'ev'
      expect missed_calls
      	.to.be.equal 1
      ee.dispatchEvent new Event 'ev'
      expect missed_calls
      	.to.be.equal 1


    it 'should attach many handlers for one call', ->
      ee = new waff.EventEmitter
      missed_calls = 0

      handler = ->
        expect this
        	.to.be.equal ee
        missed_calls++

      ee.once [ 'ev', 'ev2' ], handler
      ee.dispatchEvent new Event 'ev'
      expect missed_calls
      	.to.be.equal 1
      ee.dispatchEvent new Event 'ev'
      expect missed_calls
      	.to.be.equal 1
  context 'EventEmitter.extend', ->
    it 'should attach event', (done) ->
      @timeout 100
      obj =
        a: 'a'
        b: 'b'
      waff.EventEmitter.extend obj
      obj.on 'ev', ->
        expect @
        	.to.be.equal obj
        done()
      expect obj._emitter._events.ev
      	.to.have.lengthOf 1
      obj.dispatchEvent new Event 'ev'

    it 'should detach handler', ->
      obj =
        a: 'a'
        b: 'b'

      handler = ->
        expect @
        	.to.be.equal obj

      waff.EventEmitter.extend obj
      obj.on 'ev', handler
      obj.on 'ev', ->
      expect obj._emitter._events.ev
      	.to.have.lengthOf 2
      obj.off 'ev', handler
      expect obj._emitter._events.ev
      	.to.have.lengthOf 1

    it 'should detach all same handlers', ->
      obj =
        a: 'a'
        b: 'b'

      handler = ->
        expect @
        	.to.be.equal obj

      waff.EventEmitter.extend obj
      obj.on 'ev', handler
      obj.on 'ev', handler
      obj.on 'ev', ->
      expect obj._emitter._events.ev
      	.to.have.lengthOf 3
      obj.off 'ev', handler
      expect obj._emitter._events.ev
      	.to.have.lengthOf 1

    it 'should detach all handlers', ->
      obj =
        a: 'a'
        b: 'b'

      handler = ->
        expect(this).to.be.equal obj

      waff.EventEmitter.extend obj
      obj.on 'ev', handler
      obj.on 'ev', handler
      obj.on 'ev', ->
      expect obj._emitter._events.ev
      	.to.have.lengthOf 3
      obj.off 'ev'
      expect obj._emitter._events.ev
      	.to.have.lengthOf 0

    it 'should attach handler for one call', ->
      obj =
        a: 'a'
        b: 'b'
      missed_calls = 0

      handler = ->
        expect @
        	.to.be.equal obj
        missed_calls++

      waff.EventEmitter.extend obj
      obj.once 'ev', handler
      obj.dispatchEvent new Event 'ev'
      expect missed_calls
      	.to.be.equal 1
      obj.dispatchEvent new Event 'ev'
      expect missed_calls
      	.to.be.equal 1

    it 'should call event', (done) ->
      obj =
        a: 'a'
        b: 'b'
      @timeout 100
      # NOTE:
      # We're expecting EventTarget.once() to pass all tests
      waff.EventEmitter.extend obj
      obj.once 'ev', ->
        expect @
        	.to.be.equal obj
        done()
      obj.emit 'ev'

    it 'should call event with custom data', (done) ->
      obj =
        a: 'a'
        b: 'b'
      @timeout 100
      # NOTE:
      # We're expecting EventTarget.once() to pass all tests
      waff.EventEmitter.extend obj
      obj.once 'ev', (data) ->
        expect @
        	.to.be.equal obj
        expect data.passed
        	.to.be.true
        done()
      obj.emit 'ev', passed: true
