describe('Element.path()', function() {

  it('should return element\'s path', function () {
    workspace.reset()
    var span = document.querySelector('span.green');

    expect( document.querySelector(span.path()) ).to.be.equal( span );
  });

});
