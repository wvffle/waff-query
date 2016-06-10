describe('e()', function() {

  it('should create plain div', function () {
    var div = e('div');

    expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
    expect( div.classList ).to.have.lengthOf( 0 );
    expect( div.id ).to.equal( '' );
  });

  it('should create plain div without providing args', function () {
    var div = e();

    expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
    expect( div.classList ).to.have.lengthOf( 0 );
    expect( div.id ).to.equal( '' );
  });

  it('should create div.red', function () {
    var div = e('div.red');

    expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
    expect( [].slice.call(div.classList) ).to.have.lengthOf( 1 );
    expect( [].slice.call(div.classList) ).to.include( 'red' );
    expect( div.id ).to.equal( '' );
  });

  it('should create div.red without providing tag name', function () {
    var div = e('.red');

    expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
    expect( [].slice.call(div.classList) ).to.have.lengthOf( 1 );
    expect( [].slice.call(div.classList) ).to.include( 'red' );
    expect( div.id ).to.equal( '' );
  });

  it('should create div#text', function () {
    var div = e('div#text');

    expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
    expect( [].slice.call(div.classList) ).to.have.lengthOf( 0 );
    expect( div.id ).to.equal( 'text' );
  });

  it('should create div#text without providing tag name', function () {
    var div = e('#text');

    expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
    expect( [].slice.call(div.classList) ).to.have.lengthOf( 0 );
    expect( div.id ).to.equal( 'text' )
  });

  it('should create div#text.cl1.cl2', function () {
    var div = e('div#text.cl1.cl2');

    expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
    expect( [].slice.call(div.classList) ).to.have.lengthOf( 2 );
    expect( [].slice.call(div.classList) ).to.include( 'cl1' )
                                      .and.to.include( 'cl2' );
    expect( div.id ).to.equal( 'text' )
  });

  it('should create div#text.cl1.cl2 without providing tag name', function () {
    var div = e('#text.cl1.cl2');

    expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
    expect( [].slice.call(div.classList) ).to.have.lengthOf( 2 );
    expect( [].slice.call(div.classList) ).to.include( 'cl1' )
                                      .and.to.include( 'cl2' );
    expect( div.id ).to.equal( 'text' )
  });

  it('should create div.cl1.cl2#text', function () {
    var div = e('div.cl1.cl2#text');

    expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
    expect( [].slice.call(div.classList) ).to.have.lengthOf( 2 );
    expect( [].slice.call(div.classList) ).to.include( 'cl1' )
                                      .and.to.include( 'cl2' );
    expect( div.id ).to.equal( 'text' )
  });

  it('should create div#text.cl1.cl2 without providing tag name', function () {
    var div = e('.cl1.cl2#text');

    expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
    expect( [].slice.call(div.classList) ).to.have.lengthOf( 2 );
    expect( [].slice.call(div.classList) ).to.include( 'cl1' )
                                      .and.to.include( 'cl2' );
    expect( div.id ).to.equal( 'text' )
  });

  it('should create div.cl1#text.cl2', function () {
    var div = e('div.cl1#text.cl2');

    expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
    expect( [].slice.call(div.classList) ).to.have.lengthOf( 2 );
    expect( [].slice.call(div.classList) ).to.include( 'cl1' )
                                      .and.to.include( 'cl2' );
    expect( div.id ).to.equal( 'text' )
  });

  it('should create div#text.cl1.cl2 without providing tag name', function () {
    var div = e('.cl1#text.cl2');

    expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
    expect( [].slice.call(div.classList) ).to.have.lengthOf( 2 );
    expect( [].slice.call(div.classList) ).to.include( 'cl1' )
                                      .and.to.include( 'cl2' );
    expect( div.id ).to.equal( 'text' )
  });

});

describe('element()', function() {

  it('should be same as e()', function () {
    expect( element ).to.be.equal( e );
  });

});
