describe('EventTarget.off()', function() {

  it('should detach handler', function () {
    workspace.reset()
    var span = document.querySelector('span.green');
    var handler = function(){};

    // NOTE:
    // We're expecting that EventTarget.on() passes all tests

    span.on('ev', handler);
    span.on('ev', function(){});
    expect( span._events.ev ).to.have.lengthOf( 2 );
    span.off('ev', handler);
    expect( span._events.ev ).to.have.lengthOf( 1 );
  });

  it('should detach all same handlers', function () {
    workspace.reset()
    var span = document.querySelector('span.green');
    var handler = function(){};

    // NOTE:
    // We're expecting that Element.on() passes all tests

    span.on('ev', handler);
    span.on('ev', handler);
    span.on('ev', function(){});
    expect( span._events.ev ).to.have.lengthOf( 3 );
    span.off('ev', handler);
    expect( span._events.ev ).to.have.lengthOf( 1 );
  });

  it('should detach all handlers', function () {
    workspace.reset()
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
  });

});
