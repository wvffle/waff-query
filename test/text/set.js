describe('Text.set()', function() {

  it('should set text\'s value to string', function () {
    var text = document.createTextNode('hey');

    text.set('no');

    expect( text ).to.be.an.instanceof( Text );
    expect( text.nodeValue ).to.be.equal( 'no' );
  });

});
