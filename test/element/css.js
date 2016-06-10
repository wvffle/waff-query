describe('Element.css()', function() {

  it('should set color of span.green to red', function () {
    workspace.reset()
    var span = document.querySelector('span.green');
    span.css({color:'rgb(255, 0, 0)'});

    expect( getComputedStyle(span).color ).to.be.equal( 'rgb(255, 0, 0)' );
  });

  it('should set color of span.green to red the other way', function () {
    workspace.reset()
    var span = document.querySelector('span.green');
    span.css('color', 'rgb(255, 0, 0)');

    expect( getComputedStyle(span).color ).to.be.equal( 'rgb(255, 0, 0)' );
  });

  it('should get color of span.green', function () {
    workspace.reset()
    var span = document.querySelector('span.green');

    expect( span.css('color') ).to.be.equal( 'rgb(0, 255, 0)' );
  });

});
