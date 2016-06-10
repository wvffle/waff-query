describe('ps()', function() {

  it('should correctly parse empty function', function () {
    var s = ps('')

    expect( s.tag ).to.be.false
    expect( s.classList ).to.have.lengthOf( 0 );
    expect( s.id ).to.be.false
  });

  it('should correctly parse plain div', function () {
    var s = ps('div')

    expect( s.tag ).to.be.equal( 'div' );
    expect( s.classList ).to.have.lengthOf( 0 );
    expect( s.id ).to.be.false
  });

  it('should correctly parse div#id', function () {
    var s = ps('div#id')

    expect( s.tag ).to.be.equal( 'div' );
    expect( s.classList ).to.have.lengthOf( 0 );
    expect( s.id ).to.equal( 'id' )
  });

  it('should correctly parse div.cls1.cls2', function () {
    var s = ps('div.cls1.cls2')

    expect( s.tag ).to.be.equal( 'div' );
    expect( s.classList ).to.have.lengthOf( 2 );
    expect( s.classList ).to.include( 'cls1' )
                     .and.to.include( 'cls2' )
    expect( s.id ).to.be.false
  });

  it('should correctly parse div#id.cls1.cls2', function () {
    var s = ps('div#id.cls1.cls2')

    expect( s.tag ).to.be.equal( 'div' );
    expect( s.classList ).to.have.lengthOf( 2 );
    expect( s.classList ).to.include( 'cls1' )
                     .and.to.include( 'cls2' )
    expect( s.id ).to.equal( 'id' )
  });

  it('should correctly parse div.cls1.cls2#id', function () {
    var s = ps('div.cls1.cls2#id')

    expect( s.tag ).to.be.equal( 'div' );
    expect( s.classList ).to.have.lengthOf( 2 );
    expect( s.classList ).to.include( 'cls1' )
                     .and.to.include( 'cls2' )
    expect( s.id ).to.equal( 'id' )
  });

  it('should correctly parse div.cls1#id.cls2', function () {
    var s = ps('div.cls1#id.cls2')

    expect( s.tag ).to.be.equal( 'div' );
    expect( s.classList ).to.have.lengthOf( 2 );
    expect( s.classList ).to.include( 'cls1' )
                     .and.to.include( 'cls2' )
    expect( s.id ).to.equal( 'id' )
  });

});

describe('parseSelector()', function() {

  it('should be same as ps()', function () {
    expect( parseSelector ).to.be.equal( ps );
  });

});
