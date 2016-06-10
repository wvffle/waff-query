describe('Element.before()', function() {

  it('should put span.green before span.red', function () {
    workspace.reset()
    document.querySelector('span.red').before(document.querySelector('span.green'));
    
    expect( document.querySelector('span.green').nextSibling ).to.be.deep.equal( document.querySelector('span.red') );
  });

});
