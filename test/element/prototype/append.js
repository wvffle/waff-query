describe('Element#append()', function() {
  it('should put i2 at the end of i1', function() {
    i1.append(i2);

    expect(i1.lastChild).to.be(i2);
  });
});
