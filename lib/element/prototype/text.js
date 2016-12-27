Element.prototype.text = function(str) {
  if (str == null) {
    return this.textContent;
  }

  if (str instanceof Text) {
    str = str.get();
  } else if (str instanceof Element) {
    str = str.textContent;
  }

  if (typeof str === 'string') {
    this.textContent = str;
    return this;
  } else {
    throw 'argument 1 has to be String, Element, Text or null';
  }
};
