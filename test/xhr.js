describe('xhr', function() {

  context('waff.get()', function() {

    it('should perform get request', function (done) {
      waff.get('https://httpbin.org/get').then(function (res) {
        expect( this.status ).to.be.equal( 200 );
        done()
      }).catch(function (res) {
        expect( this.status ).to.be.equal( 200 );
        done(this.res)
      })

      this.timeout(3000)
    });
  });

  context('waff.post()', function() {

    it('should perform post request', function (done) {

      waff.post('https://httpbin.org/post', {}).then(function (res) {
        expect( this.status ).to.be.equal( 200 );
        done()
      }).catch(function (res) {
        expect( this.status ).to.be.equal( 200 );
        done(this.res)
      })

      this.timeout(3000)
    });
  });


});
