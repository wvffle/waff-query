describe('Object.extendEvents()', function() {

  it('should attach event', function () {
    workspace.reset()
    var obj = {a:'a', b: 'b'};
    Event.extend(obj);
    obj.on('ev', function(){ expect( this ).to.be.equal( obj ) })
    expect( obj._emitter._events.ev ).to.have.lengthOf( 1 )
  });

  it('should detach handler', function () {
    workspace.reset()
    var obj = {a:'a', b: 'b'};
    var handler = function(){ expect( this ).to.be.equal( obj ) };

    Event.extend(obj);
    obj.on('ev', handler);
    obj.on('ev', function(){});
    expect( obj._emitter._events.ev ).to.have.lengthOf( 2 );
    obj.off('ev', handler);
    expect( obj._emitter._events.ev ).to.have.lengthOf( 1 );
  });

  it('should detach all same handlers', function () {
    workspace.reset()
    var obj = {a:'a', b: 'b'};
    var handler = function(){ expect( this ).to.be.equal( obj ) };

    Event.extend(obj);
    obj.on('ev', handler);
    obj.on('ev', handler);
    obj.on('ev', function(){});
    expect( obj._emitter._events.ev ).to.have.lengthOf( 3 );
    obj.off('ev', handler);
    expect( obj._emitter._events.ev ).to.have.lengthOf( 1 );
  });

  it('should detach all handlers', function () {
    workspace.reset()
    var obj = {a:'a', b: 'b'};
    var handler = function(){ expect( this ).to.be.equal( obj ) };

    Event.extend(obj);
    obj.on('ev', handler);
    obj.on('ev', handler);
    obj.on('ev', function(){});
    expect( obj._emitter._events.ev ).to.have.lengthOf( 3 );
    obj.off('ev');
    expect( obj._emitter._events.ev ).to.have.lengthOf( 0 );
  });

  it('should attach handler for one call', function () {
    workspace.reset()
    var obj = {a:'a', b: 'b'};
    var missed_calls = 0;
    var handler = function(){ expect( this ).to.be.equal( obj ); missed_calls++  };

    Event.extend(obj);
    obj.once('ev', handler);
    obj.dispatchEvent(new Event('ev'));
    expect( missed_calls ).to.be.equal( 1 )
    obj.dispatchEvent(new Event('ev'));
    expect( missed_calls ).to.be.equal( 1 )
  });

  it('should call event', function (done) {
    workspace.reset()
    var obj = {a:'a', b: 'b'};

    // NOTE:
    // We're expecting EventTarget.once() to pass all tests

    Event.extend(obj);
    obj.once('ev', function(){
      expect( this ).to.be.equal( obj )
      done()
    });
    obj.emit('ev');
    this.timeout(100);
  });

  it('should call event with custom data', function (done) {
    workspace.reset()
    var obj = {a:'a', b: 'b'};

    // NOTE:
    // We're expecting EventTarget.once() to pass all tests

    Event.extend(obj);
    obj.once('ev', function(data){
      expect( this ).to.be.equal( obj )
      expect( data.passed ).to.be.true
      done()
    });
    obj.emit('ev', { passed: true });
    this.timeout(100);
  });

});
