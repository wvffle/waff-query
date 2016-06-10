describe('Element.prepend()', function() {

  it('should put #text at the begining of .workspace', function () {
    workspace.reset()
    workspace.element.prepend(document.querySelector('#text'));

    expect( workspace.element.firstChild ).to.be.equal( document.querySelector('#text') );
  });

});
