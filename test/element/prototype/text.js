describe('Element#text()', function() {
  it('should return text of i1', function() {
    i1.appendChild(i2);

    expect(i1.text()).to.be(i1.textContent);
  });

  it('should change text of i1', function() {
    i1.text('<p></p>');

    expect(i1.getElementsByTagName('p').length).to.be(0);
  });

  it('should change text of i1 to TextNode', function() {
    var text = document.createTextNode('<p></p>');
    i1.text(text);

    expect(i1.getElementsByTagName('p').length).to.be(0);
  });

  it('should change text of i1 to Element', function() {
    i1.text(i2);

    expect(i1.lastChild).not.to.be(i2);
  });

  it('should throw an error', function() {
    try {
      i1.text(new Date);
    } catch (e) {
      expect(e).to.be('argument 1 has to be String, Element, Text or null');
    }

  });
});
