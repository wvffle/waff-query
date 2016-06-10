describe('Element.text()', function() {

  it('should clear span.green', function () {
    workspace.reset()
    var span = document.querySelector('span.green');
    span.text('');

    expect( span.childNodes ).to.have.lengthOf( 1 );
    expect( span.childNodes[0].nodeValue ).to.equal( '' );
  });

  it('should return span.green\'s text', function () {
    workspace.reset()
    var span = document.querySelector('span.green');

    expect( span.text() ).to.equal( span.textContent );
  });

  it('should set span.green\'s text to <div></div>', function () {
    workspace.reset()
    var span = document.querySelector('span.green');
    span.text('<div></div>');

    expect( span.childNodes ).to.have.lengthOf( 1 );
    expect( span.childNodes[0].nodeValue ).to.equal( '<div></div>' );
  });

  it('should set span.green\'s text to array of strings', function () {
    workspace.reset()
    var span = document.querySelector('span.green');
    span.text(['well', ' ', 'then']);

    expect( span.childNodes ).to.have.lengthOf( 1 );
    expect( span.childNodes[0].nodeValue ).to.equal( 'well then' );
  });

});
