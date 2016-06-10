describe('Element.append()', function() {

  it('should put #text at the end of .workspace', function () {
    workspace.reset()
    workspace.element.append(document.querySelector('#text'));

    expect( workspace.element.lastChild ).to.be.equal( document.querySelector('#text') );
  });

});
