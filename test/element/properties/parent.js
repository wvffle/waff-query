describe('Element#parent', function() {
  it('should return parent of i1', function() {
    expect(i1.parent).to.be(document.body);
  });

  it('should set parent of i1', function() {
    i1.parent = i3;
    expect(i1.parentElement).to.be(i3);
  });

  it('should throw an error', function() {
    try {
      i1.parent = new Date;
    } catch (e) {
      expect(e).to.be('argument 1 has to be an Element');
    }

  });
});
