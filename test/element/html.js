describe('Element.html()', function() {

  it('should clear span.green', function () {
    workspace.reset()
    var span = document.querySelector('span.green');
    span.html('');

    expect( span.innerHTML ).to.equal( '' );
  });

  it('should return span.green\'s html', function () {
    workspace.reset()
    var span = document.querySelector('span.green');
    var html = span.html();

    expect( span.innerHTML ).to.equal( html );
  });

  it('should set span.green\'s html to <div></div>', function () {
    workspace.reset()
    var span = document.querySelector('span.green');
    span.html('<div></div>');

    expect( span.innerHTML ).to.equal( '<div></div>' );
  });

  it('should set span.green\'s html to all divs', function () {
    workspace.reset()
    var span = document.querySelector('span.green');
    var divs = workspace.element.querySelectorAll('div');
    span.html(divs);

    expect( [].slice.call(span.children) ).to.deep.equal( [].slice.call(divs) );
  });

});
