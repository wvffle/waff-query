describe('t()', function() {

  context('t()', function() {

    it('should create new TextNode', function () {
      var text = t('hey');

      expect( text ).to.be.an.instanceof( Text );
      expect( text.nodeValue ).to.be.equal( 'hey' );
    });

  });

  context('text()', function() {

    it('should be same as t()', function () {
      expect( text ).to.be.equal( t );
    });

  });

  context('Text.get()', function() {

    it('should get text\'s value to string', function () {
      var text = document.createTextNode('hey');

      expect( text ).to.be.an.instanceof( Text );
      expect( text.get() ).to.be.equal( text.nodeValue );
    });

  });

  context('Text.set()', function() {

    it('should set text\'s value to string', function () {
      var text = document.createTextNode('hey');

      text.set('no');

      expect( text ).to.be.an.instanceof( Text );
      expect( text.nodeValue ).to.be.equal( 'no' );
    });

  });


});
