describe('waff.text()', function() {
  it('should create new TextNode', function() {
    const node = waff.text('meh');

    expect(node).to.be.a(Text);
    expect(node.nodeValue).to.be('meh');
  });

  it('should create new TextNode with empty text', function() {
    const node = text();

    expect(node).to.be.a(Text);
    expect(node.nodeValue).to.be('');
  });

  it('should equal every other function', function() {
    expect(waff.text).to.be(text);
    expect(waff.text).to.be(t);
  });

});
