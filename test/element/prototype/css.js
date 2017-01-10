describe('Element#css()', function() {
  it('should return object of css properties', function() {
    var css = i1.css();
    expect(css).to.be.an.object;
    expect(Object.keys(css).length).to.be(0);
    i1.style.color = '#fff';
    css = i1.css();
    expect(css).to.be.an.object;
    expect(Object.keys(css).length).to.be(1);
    expect(css.color).to.be('#fff');
  });
});
