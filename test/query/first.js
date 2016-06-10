describe('q()', function() {

  it('should return document.body', function () {
    workspace.reset()
    expect( document.body ).to.deep.equal( q('body') );
  });

  it('should return #text', function () {
    workspace.reset()
    expect( document.querySelector('#text') ).to.deep.equal( q('#text') );
  });

  it('should return first .red', function () {
    workspace.reset()
    expect( document.querySelector('.red') ).to.deep.equal( q('.red') );
    expect( document.querySelector('span.red') ).to.not.deep.equal( q('.red') );
  });

  it('should find span.green in Array and NodeList', function () {
    workspace.reset()
    expect( document.querySelector('span.green') ).to.deep.equal( q('.green', [].slice.call(document.querySelectorAll('span'))) );
    expect( document.querySelector('span.green') ).to.deep.equal( q('.green', document.querySelectorAll('span')) );
  });

});

describe('query()', function() {

  it('should be same as q()', function () {
    workspace.reset()
    expect( query ).to.be.equal( q );
  });

});
