describe('Element.attr()', function() {

  it('should set [name="passed"] of span.green', function () {
    workspace.reset()
    var green = document.querySelector('span.green');
    var at = green.attr('name', 'passed');

    expect( green.getAttribute('name') ).to.be.equal( 'passed' );
    expect( at ).to.be.deep.equal( green );
  });

  it('should set [name="passed" attr2="passed2"] of span.green', function () {
    workspace.reset()
    var green = document.querySelector('span.green');
    var at = green.attr({'name': 'passed', 'attr2': 'passed2'});

    expect( green.getAttribute('name') ).to.be.equal( 'passed' );
    expect( green.getAttribute('attr2') ).to.be.equal( 'passed2' );
    expect( at ).to.be.deep.equal( green );
  });

  it('should get [name] of span.green', function () {
    workspace.reset()
    var green = document.querySelector('span.green');
    green.setAttribute('name', 'passed');
    var at = green.attr('name');

    expect( at ).to.be.equal( 'passed' );
  });

});
