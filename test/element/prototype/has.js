describe('Element#has()', function() {
  it('should check if i1 has i2', function() {
    expect(i1.has(i2)).to.be.false;
    i1.appendChild(i2);
    expect(i1.has(i2)).to.be.true;
  });
});
