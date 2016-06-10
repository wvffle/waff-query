describe('t()', function() {

  it('should create new TextNode', function () {
    var text = t('hey');

    expect( text ).to.be.an.instanceof( Text );
    expect( text.nodeValue ).to.be.equal( 'hey' );
  });

});

describe('text()', function() {

  it('should be same as t()', function () {
    expect( text ).to.be.equal( t );
  });

});
