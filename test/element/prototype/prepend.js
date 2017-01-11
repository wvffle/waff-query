describe('Element#prepend()', function() {
  it('should put i2 at the beginning of i1', function() {
    i1.prepend(i2);

    expect(i1.firstChild).to.be(i2);
  });

  it('should put i2 at the beginning of empty element', function() {
    empty.prepend(i2);

    expect(empty.firstChild).to.be(i2);
  });

  it('should put i1 and i2 in i3', function() {
    i3.prepend([i1, i2]);

    expect(i1.parentElement).to.be(i3);
    expect(i2.parentElement).to.be(i3);
  });

  it('should put i1 and text of i2 in i3', function() {
    var text = i2.childNodes[0];
    i3.prepend([i1, text]);

    expect(i1.parentElement).to.be(i3);
    expect(text.parentElement).to.be(i3);
  });

  it('should put everything but Date in empty', function() {
    var text = i2.childNodes[0];
    empty.prepend([i1, text, new Date]);

    expect(i1.parentElement).to.be(empty);
    expect(text.parentElement).to.be(empty);
    expect(empty.childNodes.length).to.be(2);
  });
});
