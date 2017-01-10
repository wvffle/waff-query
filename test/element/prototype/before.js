describe('Element#before()', function() {
  it('should put i2 before i1', function() {
    i2.before(i1);

    expect(i2.nextElementSibling).to.be(i1);
  });

  it('should put i2 before i1 in empty div', function() {
    empty.appendChild(i1);
    empty.appendChild(i2);
    i2.before(i1);

    expect(i2.nextElementSibling).to.be(i1);
  });

  it('should throw an error', function() {
    try {
      i1.before(document.documentElement);
    } catch (e) {
      expect(e).to.be('cannot insert before root element');
    }
  });
});
