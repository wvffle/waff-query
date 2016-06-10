describe('qq()', function() {

  it('should return all spans', function () {
    workspace.reset()
    expect( [].slice.call(document.querySelectorAll('span')) ).to.deep.equal( qq('span') );
  });

  it('should return all div.red', function () {
    workspace.reset()
    expect( [].slice.call(document.querySelectorAll('div.red')) ).to.deep.equal( qq('div.red') );
  });

  it('should find all span.green in Array and NodeList', function () {
    workspace.reset()
    expect( [].slice.call(document.querySelectorAll('span.green')) ).to.deep.equal( qq('.green', [].slice.call(document.querySelectorAll('span'))) );
    expect( [].slice.call(document.querySelectorAll('span.green')) ).to.deep.equal( qq('.green', document.querySelectorAll('span')) );
  });

});

describe('query.all()', function() {

  it('should be same as qq()', function () {
    workspace.reset()
    expect( query.all ).to.be.equal( qq );
  });

  it('should be same as q.all()', function () {
    workspace.reset()
    expect( query.all ).to.be.equal( q.all );
  });

});
