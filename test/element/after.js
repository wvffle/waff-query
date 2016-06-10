describe('Element.after()', function() {

  it('should put span.red after span.green', function () {
    workspace.reset()
    document.querySelector('span.green').after(document.querySelector('span.red'));

    expect( document.querySelector('span.green').nextSibling ).to.be.equal( document.querySelector('span.red') );
  });

});
