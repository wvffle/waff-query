describe('Text.get()', function() {

  it('should get text\'s value to string', function () {
    var text = document.createTextNode('hey');

    expect( text ).to.be.an.instanceof( Text );
    expect( text.get() ).to.be.equal( text.nodeValue );
  });

});
