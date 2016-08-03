describe('event', function() {

  beforeEach(function () {
      workspace.reset()
  })

  context('EventTarget.emit()', function() {

    it('should call event', function (done) {
      var span = document.createElement('span');
      this.timeout(100);

      // NOTE:
      // We're expecting EventTarget.once() to pass all tests

      span.once('ev', function(){
        done()
        span.remove()
      });
      span.emit('ev');
    });

    it('should call event with custom data', function (done) {
      var span = document.createElement('span');
      this.timeout(100);

      // NOTE:
      // We're expecting EventTarget.once() to pass all tests

      span.once('ev', function(data){
        expect( data.passed ).to.be.true
        done()
        span.remove()
      });
      span.emit('ev', { passed: true });
    });

  });

  context('Element.observe()', function() {

    it('should emit mutation event', function (done) {
      var span = document.createElement('span');
      span.observe();
      span.innerHTML = '_'

      // NOTE:
      // We're expecting EventTarget.once() to pass all tests

      span.once('mutation', function(){
        done()
        span.remove()
      });

      this.timeout(100)
    });

    it('should stop observation', function () {
      var span = document.createElement('span');
      span.observe();
      span.stopObserving();
      span.innerHTML = '_'
      var called = false;
      span.once('mutation', function(){
        called = true;
      });
      expect( called ).to.be.false
      span.remove()
    });

  });

  context('EventTarget.off()', function() {

    it('should detach handler', function () {
      var span = document.createElement('span');
      var handler = function(){};

      // NOTE:
      // We're expecting that EventTarget.on() passes all tests

      span.on('ev', handler);
      span.on('ev', function(){});
      expect( span._events.ev ).to.have.lengthOf( 2 );
      span.off('ev', handler);
      expect( span._events.ev ).to.have.lengthOf( 1 );
      span.remove()
    });

    it('should detach all same handlers', function () {
      var span = document.createElement('span');
      var handler = function(){};

      // NOTE:
      // We're expecting that Element.on() passes all tests

      span.on('ev', handler);
      span.on('ev', handler);
      span.on('ev', function(){});
      expect( span._events.ev ).to.have.lengthOf( 3 );
      span.off('ev', handler);
      expect( span._events.ev ).to.have.lengthOf( 1 );
      span.remove()
    });

    it('should detach all handlers', function () {
      var span = document.querySelector('span.green');
      var handler = function(){};

      // NOTE:
      // We're expecting that Element.on() passes all tests

      span.on('ev', handler);
      span.on('ev', handler);
      span.on('ev', function(){});
      expect( span._events.ev ).to.have.lengthOf( 3 );
      span.off('ev');
      expect( span._events.ev ).to.have.lengthOf( 0 );
      span.remove()
    });

  });

  context('EventTarget.on()', function() {

    it('should attach event', function (done) {
      var span = document.createElement('span');
      this.timeout(100)
      span.on('ev', function(){
        expect( this ).to.be.equal( span )
        done()
        span.remove()
      })
      span.dispatchEvent(new Event('ev'));
    });

    it('should attach many events', function (done) {
      var span = document.createElement('span');
      var e = 0
      this.timeout(100)
      span.on(['ev', 'ev2'], function(){
        expect( this ).to.be.equal( span )
        e++
        if(e === 2){
          done()
          span.remove()
        }
      })

      expect( span._events.ev ).to.have.lengthOf( 2 )
      span.dispatchEvent(new Event('ev'));
      span.dispatchEvent(new Event('ev2'));
    });

  });

  context('EventTarget.once()', function() {

    it('should attach handler for one call', function () {
      var span = document.createElement('span');
      var missed_calls = 0;
      var handler = function(){
        expect( this ).to.be.equal( span );
        missed_calls++
      };

      span.once('ev', handler);
      span.dispatchEvent(new Event('ev'));
      expect( missed_calls ).to.be.equal( 1 )
      span.dispatchEvent(new Event('ev'));
      expect( missed_calls ).to.be.equal( 1 )
      span.remove()
    });

    it('should attach many handlers for one call', function () {
      var span = document.createElement('span');
      var missed_calls = 0;
      var handler = function(){
        expect( this ).to.be.equal( span );
        missed_calls++
      };

      span.once(['ev', 'ev2'], handler);
      span.dispatchEvent(new Event('ev'));
      expect( missed_calls ).to.be.equal( 1 )
      span.dispatchEvent(new Event('ev'));
      expect( missed_calls ).to.be.equal( 1 )
      span.remove()
    });

  });

  context('Event.extend()', function() {

    it('should attach event', function (done) {
      var obj = {a:'a', b: 'b'};
      Event.extend(obj);
      obj.on('ev', function(){
        expect( this ).to.be.equal( obj )
      })
      expect( obj._emitter._events.ev ).to.have.lengthOf( 1 )
      this.timeout(100)
      done()
    });

    it('should detach handler', function () {
      var obj = {a:'a', b: 'b'};
      var handler = function(){
        expect( this ).to.be.equal( obj )
      };

      Event.extend(obj);
      obj.on('ev', handler);
      obj.on('ev', function(){});
      expect( obj._emitter._events.ev ).to.have.lengthOf( 2 );
      obj.off('ev', handler);
      expect( obj._emitter._events.ev ).to.have.lengthOf( 1 );
    });

    it('should detach all same handlers', function () {
      var obj = {a:'a', b: 'b'};
      var handler = function(){
        expect( this ).to.be.equal( obj )
      };

      Event.extend(obj);
      obj.on('ev', handler);
      obj.on('ev', handler);
      obj.on('ev', function(){});
      expect( obj._emitter._events.ev ).to.have.lengthOf( 3 );
      obj.off('ev', handler);
      expect( obj._emitter._events.ev ).to.have.lengthOf( 1 );
    });

    it('should detach all handlers', function () {
      var obj = {a:'a', b: 'b'};
      var handler = function(){
        expect( this ).to.be.equal( obj )
      };

      Event.extend(obj);
      obj.on('ev', handler);
      obj.on('ev', handler);
      obj.on('ev', function(){});
      expect( obj._emitter._events.ev ).to.have.lengthOf( 3 );
      obj.off('ev');
      expect( obj._emitter._events.ev ).to.have.lengthOf( 0 );
    });

    it('should attach handler for one call', function () {
      var obj = {a:'a', b: 'b'};
      var missed_calls = 0;
      var handler = function(){
        expect( this ).to.be.equal( obj );
        missed_calls++
      };

      Event.extend(obj);
      obj.once('ev', handler);
      obj.dispatchEvent(new Event('ev'));
      expect( missed_calls ).to.be.equal( 1 )
      obj.dispatchEvent(new Event('ev'));
      expect( missed_calls ).to.be.equal( 1 )
    });

    it('should call event', function (done) {
      var obj = {a:'a', b: 'b'};
      this.timeout(100);

      // NOTE:
      // We're expecting EventTarget.once() to pass all tests

      Event.extend(obj);
      obj.once('ev', function(){
        expect( this ).to.be.equal( obj )
        done()
      });
      obj.emit('ev');
    });

    it('should call event with custom data', function (done) {
      var obj = {a:'a', b: 'b'};
      this.timeout(100);

      // NOTE:
      // We're expecting EventTarget.once() to pass all tests

      Event.extend(obj);
      obj.once('ev', function(data){
        expect( this ).to.be.equal( obj )
        expect( data.passed ).to.be.true
        done()
      });
      obj.emit('ev', { passed: true });
    });

  });





});
