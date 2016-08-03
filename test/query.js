describe('query', function() {

  beforeEach(function () {
    workspace.reset()
  })

  context('qq()', function() {

    it('should return all spans', function () {
      expect( [].slice.call(document.querySelectorAll('span')) ).to.deep.equal( qq('span') );
    });

    it('should return all div.red', function () {
      expect( [].slice.call(document.querySelectorAll('div.red')) ).to.deep.equal( qq('div.red') );
    });

    it('should find all span.green in Array and NodeList', function () {
      expect( [].slice.call(document.querySelectorAll('span.green')) ).to.deep.equal( qq('.green', [].slice.call(document.querySelectorAll('span'))) );
      expect( [].slice.call(document.querySelectorAll('span.green')) ).to.deep.equal( qq('.green', document.querySelectorAll('span')) );
    });

    it('should find all span.green and dir.red', function () {
      var arr = [].slice.call(document.querySelectorAll('span.green'))
      var arr2 = [].slice.call(document.querySelectorAll('div.red'))
      arr.push.apply(arr, arr2)
      expect( arr ).to.deep.equal( qq(['span.green', 'div.red']) );
    });

  });

  context('query.all()', function() {

    it('should be same as qq()', function () {
      expect( query.all ).to.be.equal( qq );
    });

    it('should be same as q.all()', function () {
      expect( query.all ).to.be.equal( q.all );
    });

  });

  context('q()', function() {

    it('should return document.body', function () {
      expect( document.body ).to.deep.equal( q('body') );
    });

    it('should return #text', function () {
      expect( document.querySelector('#text') ).to.deep.equal( q('#text') );
    });

    it('should return first .red', function () {
      expect( document.querySelector('.red') ).to.deep.equal( q('.red') );
      expect( document.querySelector('span.red') ).to.not.deep.equal( q('.red') );
    });

    it('should find span.green in Array and NodeList', function () {
      expect( document.querySelector('span.green') ).to.deep.equal( q('.green', [].slice.call(document.querySelectorAll('span'))) );
      expect( document.querySelector('span.green') ).to.deep.equal( q('.green', document.querySelectorAll('span')) );
    });

  });

  context('query()', function() {

    it('should be same as q()', function () {
      expect( query ).to.be.equal( q );
    });

  });



});
