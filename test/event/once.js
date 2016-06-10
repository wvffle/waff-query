describe('EventTarget.once()', function() {

  it('should attach handler for one call', function () {
    workspace.reset()
    var span = document.querySelector('span.green');
    var missed_calls = 0;
    var handler = function(){ expect( this ).to.be.equal( span ); missed_calls++ };

    span.once('ev', handler);
    span.dispatchEvent(new Event('ev'));
    expect( missed_calls ).to.be.equal( 1 )
    span.dispatchEvent(new Event('ev'));
    expect( missed_calls ).to.be.equal( 1 )
  });

});
