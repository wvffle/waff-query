describe('Element.q()', function() {

  it('should return span.green', function () {
    workspace.reset()

    expect( workspace.element.q('span.green') ).to.be.equal( workspace.element.querySelector('span.green') );
  });

});

describe('Element.query()', function() {

  it('should be equal to Element.q()', function () {
    workspace.reset()
    expect( workspace.element.query ).to.be.equal( workspace.element.q );
  });

});

describe('Element.qq()', function() {

  it('should return all spans', function () {
    workspace.reset()

    expect( workspace.element.qq('span') ).to.deep.equal( [].slice.call(workspace.element.querySelectorAll('span')) );
  });

});

describe('Element.query.all()', function() {

  it('should be equal to Element.qq()', function () {
    workspace.reset()
    expect( workspace.element.query.all ).to.be.equal( workspace.element.qq );
  });

  it('should be equal to Element.q.all()', function () {
    workspace.reset()
    expect( workspace.element.query.all ).to.be.equal( workspace.element.q.all );
  });

});
