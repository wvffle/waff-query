describe('Element#css()', function() {
  it('should return object of css properties', function() {
    var css = i1.css();
    expect(css).to.be.an.object;
    expect(Object.keys(css).length).to.be(1);
    i1.style.color = 'rgb(255, 255, 255)';
    css = i1.css();
    expect(css).to.be.an.object;
    expect(Object.keys(css).length).to.be(2);
    expect(css.color).to.be('rgb(255, 255, 255)');
  });

  it('should set color of i1 to black', function() {
    i1.css('color', '#000');
    expect(i1.style.color).to.be('rgb(0, 0, 0)');
  });

  it('should set color of i1 to black', function() {
    i1.css({color: '#000'});
    expect(i1.style.color).to.be('rgb(0, 0, 0)');
  });

  it('should set margin-top of i1', function() {
    i1.css({marginTop: '3px'});
    expect(i1.style.marginTop).to.be('3px');
  });

  it('should dynamically set margin-top of i1', function() {
    i1.css('marginTop', 3);
    expect(i1.style.marginTop).to.be('3px');
  });

  it('should get color of i1', function() {
    i1.style.color = '#000';
    expect(i1.css('color')).to.be('rgb(0, 0, 0)');
  });

  it('should get margin-top of i1', function() {
    i1.style.marginTop = '3px';
    expect(i1.css().marginTop).to.be('3px');
  });
});
