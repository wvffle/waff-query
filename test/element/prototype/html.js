describe('Element#html()', function() {
  it('should return html of i1', function() {
    i1.appendChild(i2);

    expect(i1.html()).to.be(i1.innerHTML);
  });

  it('should change html of i1', function() {
    i1.html('<p></p>');

    expect(i1.getElementsByTagName('p').length).to.be(1);
  });

  it('should change html of i1 to TextNode', function() {
    var text = document.createTextNode('<p></p>');
    i1.html(text);

    expect(i1.getElementsByTagName('p').length).to.be(1);
  });

  it('should change html of i1 to Element', function() {
    i1.html(i2);

    expect(i1.lastChild).to.be(i2);
  });

  it('should throw an error', function() {
    try {
      i1.html(new Date);
    } catch (e) {
      expect(e).to.be('argument 1 has to be String, Element, Text or null');
    }

  });
});
