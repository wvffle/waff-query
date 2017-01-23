describe('Element#after()', function() {
  it('should put i1 after i2', function() {
    i1.after(i2);

    expect(i2.nextElementSibling).to.be(i1);
  });

  it('should put i1 after i2 in empty div', function() {
    empty.appendChild(i1);
    empty.appendChild(i2);
    i1.after(i2);

    expect(i2.nextElementSibling).to.be(i1);
  });

  it('should throw an error', function() {
    try {
      i1.after(document.documentElement);
    } catch (e) {
      expect(e).to.be('cannot insert after root element');
    }
  });
});
