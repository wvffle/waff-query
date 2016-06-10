describe('Element.observe()', function() {

  it('should emit mutation event', function (done) {
    workspace.reset()
    var span = document.querySelector('span.green');
    span.observe();
    span.innerHTML = '_'

    // NOTE:
    // We're expecting EventTarget.once() to pass all tests

    span.once('mutation', function(){
      done()
    });

    this.timeout(100)
  });

  it('should stop observation', function () {
    workspace.reset()
    var span = document.querySelector('span.green');
    span.observe();
    span.stopObserving();
    span.innerHTML = '_'
    var called = false;
    span.once('mutation', function(){
      called = true;
    });
    expect( called ).to.be.false
  });

});
