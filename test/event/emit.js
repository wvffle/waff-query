describe('EventTarget.emit()', function() {

  it('should call event', function (done) {
    workspace.reset()
    var span = document.querySelector('span.green');

    // NOTE:
    // We're expecting EventTarget.once() to pass all tests

    span.once('ev', function(){
      done()
    });
    span.emit('ev');
    this.timeout(100);
  });

  it('should call event with custom data', function (done) {
    workspace.reset()
    var span = document.querySelector('span.green');

    // NOTE:
    // We're expecting EventTarget.once() to pass all tests

    span.once('ev', function(data){
      expect( data.passed ).to.be.true
      done()
    });
    span.emit('ev', { passed: true });
    this.timeout(100);
  });

});
