describe('EventTarget.on()', function() {

  it('should attach event', function (done) {
    workspace.reset()
    var span = document.querySelector('span.green');
    span.on('ev', function(){
      expect( this ).to.be.equal( span )
      done()
    })
    span.dispatchEvent(new Event('ev'));
    this.timeout(100)
  });

});
