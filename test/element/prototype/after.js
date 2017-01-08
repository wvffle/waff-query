describe('Element#after()', function() {
  it('should put i1 after i2', function() {
    i1.after(i2);

    expect(i2.nextElementSibling).to.be(i1);
  });
});
