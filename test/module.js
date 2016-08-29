var global;

global = global || this;

requirejs.config({
  paths: {
    'waff-query': '../dist/waff-query'
  }
});

describe('module', function() {
  it('should be in global scope', function() {
    expect(global.waff).to.not.be["null"];
    return expect(global.waff.version).to.not.be["null"];
  });
  return it('should be requireable by amd', function(done) {
    requirejs(['waff-query'], function(waffq) {
      expect(waffq).to.not.be["null"];
      expect(waffq.version).to.not.be["null"];
      return done();
    });
    return this.timeout(666);
  });
});
