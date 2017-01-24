describe('Element#inside()', function() {
  it('should check if i1 is in i2', function() {
    expect(i1.inside(i2)).to.be(false);
    i2.appendChild(i1);
    expect(i1.inside(i2)).to.be(true);
  });

  it('should check if i1 is deep in i3', function() {
    expect(i1.inside(i3)).to.be(false);
    i2.appendChild(i1);
    i3.appendChild(i2);
    expect(i1.inside(i2)).to.be(true);
    expect(i1.inside(i3)).to.be(true);
  });
});
