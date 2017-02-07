describe('Element#next', function() {
  it('should return next sibling of i1', function() {
    expect(i1.next).to.be(i2);
  });

  it('should set next sibling of i1', function() {
    i1.next = i3;
    expect(i1.nextElementSibling).to.be(i3);
  });

  it('should throw an error', function() {
    try {
      i1.next = new Date;
    } catch (e) {
      expect(e).to.be('argument 1 has to be an Element');
    }

  });
});
