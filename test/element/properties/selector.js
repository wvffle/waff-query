describe('Element#selector', function() {
  it('should return selector of all elements', function() {
    expect(document.querySelector(i1.selector)).to.be(i1);
    expect(document.querySelector(nah.selector)).to.be(nah);
  });

  it('should set selector of element', function() {
    const el = document.createElement('div');
    el.selector = '.nah#id.meh[meh=\'waff\'][waff="query"]';

    expect(el.id).to.be('id');
    expect(el.className).to.be('nah meh');
    expect(el.getAttribute('meh')).to.be('waff');
    expect(el.getAttribute('waff')).to.be('query');
  });

  it('should throw an error', function() {
    try {
      const el = document.createElement('div');
      el.selector = new Date();
    } catch (e) {
      expect(e).to.be('argument 1 has to be String');
    }
  });

  it('should throw an error', function() {
    try {
      const el = document.createElement('div');
      el.selector = 'p';
    } catch (e) {
      expect(e).to.be('cannot change tagName of Element from \'div\' to \'p\'');
    }
  });
});
