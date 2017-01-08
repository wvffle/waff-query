describe('Text#get()', function() {
  it('should return textContent of i1', function() {
    expect(i1.childNodes[0].get()).to.be(i1.textContent);
  });

  it('should return textContent of i2', function() {
    expect(i2.childNodes[0].get()).to.be(i2.textContent);
  });
});
