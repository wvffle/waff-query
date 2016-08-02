var global = this;
requirejs.config({
  paths: {
    'waff-query': '../dist/waff-query'
  }
});

describe('module', function() {

  it('should be in global scope', function () {
    expect( global.waff ).to.not.be.null;
    expect( global.waff.version ).to.not.be.null;
  });

  // NOTE:
  // Basically if it works with amd it should also work with pure node

  it('should be requireable by amd', function (done) {
    requirejs(['waff-query'], function(waffq){
      expect( waffq ).to.not.be.null;
      expect( waffq.version ).to.not.be.null;
      done()
    });
    this.timeout(666);
  });
});
