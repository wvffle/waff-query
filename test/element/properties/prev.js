describe('Element#prev', function() {
  it('should return preious element of i2', function() {
    expect(i2.prev).to.be(i1);
  });

  it('should set previous element of i1', function() {
    i1.prev = i3;
    expect(i1.previousElementSibling).to.be(i3);
  });

  it('should throw an error', function() {
    try {
      i1.prev = new Date;
    } catch (e) {
      expect(e).to.be('argument 1 has to be an Element');
    }

  });
});
