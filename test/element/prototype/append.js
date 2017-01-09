describe('Element#append()', function() {
  it('should put i2 at the end of i1', function() {
    i1.append(i2);

    expect(i1.lastChild).to.be(i2);
  });

  it('should put i1 and i2 in i3', function() {
    i3.append([i1, i2]);

    expect(i1.parentElement).to.be(i3);
    expect(i2.parentElement).to.be(i3);
  });

  it('should put i1 and text of i2 in i3', function() {
    var text = i2.childNodes[0];
    i3.append([i1, text]);

    expect(i1.parentElement).to.be(i3);
    expect(text.parentElement).to.be(i3);
  });

  it('should put everything but Date in i3', function() {
    var text = i2.childNodes[0];
    i3.append([i1, text, new Date]);

    expect(i1.parentElement).to.be(i3);
    expect(text.parentElement).to.be(i3);
    expect(i3.childNodes.length).to.be(3);
  });
});
